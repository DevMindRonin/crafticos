# Kompletní flow autentizace ve vaší aplikaci

Nyní rozkličuji celý proces autentizace podle vašich souborů. Rozdělím to na dva hlavní scénáře: přihlášení pomocí emailu/hesla a přihlášení přes Google.

## 1. Přihlášení pomocí emailu a hesla

### Frontend část (page.tsx)

1. **Uživatel vyplní formulář**:
   - Email a heslo se ukládají do stavu komponenty
   - Po odeslání formuláře se volá `handleSubmit`

2. **Volání `signIn` z NextAuth**:
   ```typescript
   const result = await signIn("credentials", {
     redirect: false,
     email,
     password,
   });
   ```
   - Toto volá NextAuth credentials provider

### Frontend část (src/app/auth/[...nextauth]/route.ts)

3. **Credentials Provider**:
   - Získá credentials z requestu
   - Volá GraphQL mutaci `LOGIN_MUTATION` s email a heslem
   ```typescript
   const { data } = await client.mutate({
     mutation: LOGIN_MUTATION,
     variables: {
       email: credentials.email,
       password: credentials.password,
       isGoogleFlow: false,
     },
   });
   ```

4. **GraphQL mutace (auth.ts)**:
   - Frontend posílá mutaci na backend
   ```graphql
   mutation Login($email: String!, $password: String, $isGoogleFlow: Boolean) {
     login(email: $email, password: $password, isGoogleFlow: $isGoogleFlow) {
       token
       user {
         id
         email
         name
         role
       }
     }
   }
   ```

### Backend resolvery (authRepository.ts)

5. **Login funkce**:
   - Najde uživatele v DB podle emailu
   ```typescript
   const user = await db.oneOrNone(SQL.LOGIN_USER, [email]);
   ```
   - Ověří heslo pomocí bcrypt:
   ```typescript
   const valid = await comparePassword(password, user.password);
   ```
   - Pokud je vše v pořádku, vygeneruje JWT token:
   ```typescript
   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
     expiresIn: Number(process.env.ACCESS_TOKEN_TIME),
   });
   ```

6. **Návrat do Credentials Provideru**:
   - Vrátí user data a token:
   ```typescript
   return {
     id: user.id,
     email: user.email,
     name: user.name,
     role: user.role,
     accessToken: token,
   };
   ```

7. **NextAuth callbacks**:
   - `jwt` callback: přidá user data do tokenu
   - `session` callback: přidá user data do session
   - Session je pak dostupná v celé aplikaci přes `useSession`

8. **Návrat na frontend**:
   - Pokud vše proběhne v pořádku, uživatel je přesměrován na `/dashboard`
   - Pokud ne, zobrazí se chybová zpráva

## 2. Přihlášení přes Google

1. **Uživatel klikne na "Přihlásit se přes Google"**:
   ```typescript
   onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
   ```

2. **Google Provider v route.ts**:
   - Získá Google profil
   - Nejprve zkusí najít uživatele podle emailu:
   ```typescript
   const res = await client.query({
     query: GET_USER_QUERY,
     variables: { email: profile.email },
   });
   ```
   - Pokud uživatel existuje, přihlásí ho:
   ```typescript
   const { data: loginData } = await client.mutate({
     mutation: LOGIN_MUTATION,
     variables: {
       email: profile.email,
       password: "",
       isGoogleFlow: true,
     },
   });
   ```
   - Pokud neexistuje, zaregistruje ho:
   ```typescript
   const { data } = await client.mutate({
     mutation: REGISTER_MUTATION,
     variables: {
       email: profile.email,
       password: "",
       name: profile.name,
       role: Role.USER,
     },
   });
   ```

3. **Zbytek flow**:
   - Stejný jako u credentials - token se přidá do JWT a session
   - Uživatel je přesměrován na `/dashboard`

## Důležité vazby mezi soubory

1. **Frontend → Backend**:
   - `page.tsx` → volá `signIn` z NextAuth (`route.ts`)
   - `route.ts` používá GraphQL klienta pro komunikaci s backendem

2. **GraphQL komunikace**:
   - Definice mutací a query v `auth.ts`
   - Resolvery v `authRepository.ts`
   - Připojení k DB v `authRepository.ts`

3. **Autentizace**:
   - NextAuth (`route.ts`) zpracovává přihlášení
   - JWT token se generuje v `authRepository.ts`
   - Token se validuje v `token.ts`

4. **Session management**:
   - NextAuth callbacks (`jwt` a `session`) spravují session
   - Session je dostupná v celé aplikaci

## Bezpečnostní prvky

1. **Hesla**:
   - Hashování pomocí bcrypt v `password.ts`
   - Ověřování pomocí `comparePassword`

2. **Tokeny**:
   - JWT podepsané tajným klíčem
   - Expirace tokenů

3. **Ověřování**:
   - Kontrola existence uživatele
   - Validace vstupů
   - Rozdělení běžného a Google přihlášení

Tento flow zajišťuje bezpečné přihlášení jak pomocí emailu/hesla, tak přes Google, s řádným ukládáním uživatelských dat a generováním přístupových tokenů.