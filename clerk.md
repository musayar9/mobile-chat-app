# 🔐 Clerk + Expo SecureStore ile Token Saklama

Bu dosya, **React Native (Expo)** projesinde **Clerk** kimlik doğrulama sistemini kullanırken, oturum (token) bilgilerini güvenli bir şekilde cihazda saklamak için hazırlanmıştır.

Token'lar, Expo'nun sunduğu `expo-secure-store` kütüphanesi ile cihazın güvenli alanında saklanır. Böylece özellikle mobil cihazlarda (iOS/Android) kullanıcı oturum bilgileri güvenli bir şekilde korunur.

---

## 📦 Kullanılan Kütüphaneler

```ts
import { TokenCache } from "@clerk/clerk-expo/dist/cache";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
```

- **@clerk/clerk-expo**: Clerk’in mobil uygulamalar için sunduğu kimlik doğrulama paketi.
- **expo-secure-store**: Hassas verileri (örneğin token) güvenli şekilde cihazda saklamamıza olanak tanır.
- **react-native / Platform**: Uygulamanın hangi platformda (web, iOS, Android) çalıştığını kontrol etmek için kullanılır.

---

## 🔧 `createCacheToken()` Fonksiyonu

Bu fonksiyon, Clerk için özel bir `TokenCache` nesnesi oluşturur ve iki temel işlev sunar:

```ts
{
  getToken: async (key: string) => { ... },
  saveToken: (key: string, token: string) => { ... }
}
```

### 📥 `getToken`

- Parametre olarak bir `key` alır.
- Daha önce `SecureStore` ile kaydedilmiş olan token’ı bu anahtar ile getirir.
- Eğer token varsa konsola bilgi verir:
  ```bash
  example_key was used 🔐
  ```
- Eğer token bulunamazsa:
  ```bash
  No values stored under key: example_key
  ```
- Eğer hata olursa, hatayı loglar ve bozulmuş olabileceği ihtimaliyle o anahtarı siler:
  ```ts
  await SecureStore.deleteItemAsync(key);
  ```

### 📤 `saveToken`

- Verilen `key` ve `token` değerini güvenli şekilde cihazda saklar.
- `SecureStore.setItemAsync(key, token)` kullanır.

---

## 🌐 Platforma Özel Kullanım

```ts
export const tokenCache =
  Platform.OS !== "web" ? createCacheToken() : undefined;
```

- Eğer uygulama **mobil platformda** (iOS/Android) çalışıyorsa `tokenCache` oluşturulur.
- Eğer **web platformu** ise `undefined` olarak kalır çünkü `SecureStore` web'de çalışmaz.

---

## ✅ Nasıl Kullanılır?

`tokenCache`, Clerk’in `ClerkProvider` bileşenine verilir:

```tsx
<ClerkProvider
  publishableKey={CLERK_PUBLISHABLE_KEY}
  tokenCache={tokenCache}
>
  <App />
</ClerkProvider>
```

Bu sayede Clerk, token’ları güvenli bir şekilde cihazda saklayabilir.

---

## 🛡️ Neden `expo-secure-store`?

- 🔐 Veriler cihazın güvenli alanında saklanır (şifrelenmiş).
- 💥 Hatalı veya bozulmuş token’lar silinir.
- 🧠 Kullanıcının token bilgileri uygulama yeniden başlatıldığında da hatırlanabilir olur.

---

## 📚 Kaynaklar

- [Clerk - Expo Dokümantasyonu](https://clerk.dev/docs/reference/clerk-expo)
- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [React Native Platform API](https://reactnative.dev/docs/platform)
