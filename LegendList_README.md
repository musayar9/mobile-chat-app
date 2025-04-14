
# 📋 LegendList Kullanımı (React Native)

**LegendList**, React Native projelerinde yüksek performanslı listeler oluşturmak için kullanılan, tamamen JavaScript/TypeScript ile yazılmış bir liste bileşenidir. Native bağımlılığı olmadığı için Expo ile uyumludur ve `FlatList` ile `FlashList` için bir alternatif olarak kullanılabilir.

---

## 🚀 Kurulum

```bash
npm install @legendapp/list
```

veya

```bash
yarn add @legendapp/list
```

---

## ✅ Temel Kullanım

```tsx
import { LegendList } from '@legendapp/list';
import { View, Text } from 'react-native';

const data = [
  { id: '1', name: 'Mesaj 1' },
  { id: '2', name: 'Mesaj 2' },
];

<LegendList
  data={data}
  renderItem={({ item }) => (
    <View style={{ padding: 12, backgroundColor: '#eee', marginBottom: 8 }}>
      <Text>{item.name}</Text>
    </View>
  )}
  keyExtractor={(item) => item.id}
/>
```

---

## ⚙️ Gelişmiş Özellikler ve Props Açıklamaları

### 🔁 `recycleItems={true}`
Render edilen öğeleri tekrar kullanır. Bellek tüketimini azaltır ve scroll performansını artırır. Uzun listeler için önerilir.

### 🔢 `initialScrollIndex={messages.length - 1}`
Liste yüklendiğinde en son öğeye scroll eder. Genellikle chat uygulamalarında son mesajın görünmesini sağlamak için kullanılır.

### 📍 `alignItemsAtEnd`
Listeyi en sona hizalar. Ekran boyutundan kısa olan içerikler alt köşeye yaslanır. Chat arayüzlerinde idealdir.

### 🔒 `maintainScrollAtEnd`
Kullanıcı listenin sonundaysa ve yeni öğe eklenirse scroll otomatik olarak en sona gider. Kullanıcı yukarıda ise scroll yapılmaz.

### 📉 `maintainScrollAtEndThreshold={0.5}`
"Sondayız" kontrolü için eşik değeri. 0.5 değeri, ekranın alt yarısında olunması durumunda scroll yapılmasını sağlar.

### 📏 `maintainVisibleContentPosition`
Yeni öğeler üstten eklendiğinde kullanıcının ekran pozisyonunu korur. Yukarı kaydırma veya ekran zıplamalarını engeller.

### 📐 `estimatedItemSize={100}`
Liste öğelerinin yaklaşık yüksekliğini belirtir. `initialScrollIndex` gibi özelliklerin çalışabilmesi için gereklidir. Öğeler sabit değilse ortalama değer girilir.

---

## 💬 Örnek Kullanım (Chat Listesi)

```tsx
<LegendList
  data={messages}
  renderItem={({ item }) => (
    <MessageBubble content={item.content} />
  )}
  keyExtractor={(item) => item.id}
  recycleItems={true}
  initialScrollIndex={messages.length - 1}
  alignItemsAtEnd
  maintainScrollAtEnd
  maintainScrollAtEndThreshold={0.5}
  maintainVisibleContentPosition
  estimatedItemSize={100}
/>
```

---

## 🧠 Ne Zaman LegendList Kullanmalısın?

- Çok sayıda öğe varsa
- Öğelerin yükseklikleri farklıysa
- Expo projesi kullanıyorsan
- FlashList’in native bağımlılıkları seni zorluyorsa
- Chat gibi performans-kritik bir yapı geliştiriyorsan

---

## 🔗 Kaynak

- [Legend List GitHub](https://github.com/legendapp/legendapp)
- [LegendList Belgeleri](https://legendapp.com/open-source/list/)

---
