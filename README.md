# Expo Clerk Setup - Gerekli Paketler

Bu proje, Clerk kimlik doğrulama sistemi ile birlikte Expo kullanılarak geliştirilmiştir. Aşağıdaki paketler, kimlik doğrulama, güvenli veri saklama ve native ayarları yapılandırmak için kullanılmaktadır.

## 📦 Yüklenen Paketler

### 🔐 `expo-security-store`

**Amaç:**  
Güvenli bir şekilde küçük verileri (örneğin oturum tokenları) cihazda saklamanızı sağlar.

**Ne zaman kullanılır?**  
- Tokenları güvenli şekilde saklamak için
- Kullanıcı oturumunun açık olup olmadığını kontrol ederken

**Platform desteği:**  
- Android’de EncryptedSharedPreferences
- iOS’ta Keychain kullanır

---

### 🔑 `expo-auth-session`

**Amaç:**  
OAuth 2.0 tabanlı kimlik doğrulama işlemlerini (Google, GitHub, Facebook ile giriş vb.) yönetir.

**Ne zaman kullanılır?**  
- Sosyal medya girişleri
- Clerk ile birlikte auth flow kurarken

**Avantajı:**  
Hem web hem de mobil platformlarda sorunsuz çalışır.

---

### 🔐 `expo-crypto`

**Amaç:**  
Kriptografik işlemler için kullanılır. Örneğin, SHA-256 hash üretmek ya da UUID oluşturmak gibi işlemler için idealdir.

**Ne zaman kullanılır?**  
- Şifreleme ve veri doğrulama
- Güvenli token üretimi

---

### ⚙️ `expo-build-properties`

**Amaç:**  
Expo projelerinde native build ayarlarını (`minSdkVersion`, `targetSdkVersion` vs.) programlı olarak değiştirmenizi sağlar.

**Ne zaman kullanılır?**  
- Expo'dan eject etmeden native ayarları özelleştirmek gerektiğinde

**Avantajı:**  
Android ve iOS tarafında native yapılandırmalar yapabilmenizi sağlar.

---

## ✅ Kurulum Komutu

Aşağıdaki komutu çalıştırarak gerekli paketleri yükleyebilirsiniz:

```bash
npx expo install expo-security-store expo-auth-session expo-crypto expo-build-properties

```
#### Slot


Expo Router'da Slot bileşeni, düzen (layout) dosyalarında çocuk (nested) rotaların nereye render edileceğini belirlemek için kullanılan bir placeholder'dır. Örneğin:

- Bir layout dosyasında, uygulamanın genel yapısını tanımlarsınız.
- Bu dosya içerisinde <Slot /> ekleyerek, alt rota (child route) bileşenlerinin nereye yerleşeceğini belirtmiş olursunuz.

Örnek kullanım:

```tsx
import { Slot } from 'expo-router';
import { View, Text } from 'react-native';

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Genel Başlık</Text>
      {/* Alt rotalar buraya render edilecektir */}
      <Slot />
    </View>
  );
}
```
Bu yapı, uygulama içinde tutarlı bir görünüm sağlar ve alt rotalara ortak özellikler eklemenize olanak tanır. Slot kullanımı sayesinde, nested layout'lar oluşturmak ve uygulamanın belirli bölümlerinde farklı içerikleri yönetmek daha kolay hale gelir.