<div align="center">

# ⚡ E-246 V2 — النظام الشامل لإدارة وحماية سيرفرات ديسكورد

![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) 
![Discord.js](https://img.shields.io/badge/Discord.js-v14.26-5865F2?style=for-the-badge&logo=discord&logoColor=white) 
![MongoDB](https://img.shields.io/badge/MongoDB-Supported-47A248?style=for-the-badge&logo=mongodb&logoColor=white) 
![Version](https://img.shields.io/badge/Version-2.0.0-8C52FF?style=for-the-badge)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

بوت ديسكورد عربي متكامل واحترافي بنسخته الثانية **V2**، مصمم للإنتاج، يحتوي على لوحة تحكم ويب تفاعلية متجاوبة (Dashboard)، نظام كاش داخلي فائق السرعة، قاعدة بيانات MongoDB، نسخ احتياطي يومي تلقائي، أنظمة حماية متقدمة، ألعاب جماعية، رومات صوتية مؤقتة، نظام تذاكر ودعم فني متكامل، ونظام موسيقى.

</div>

---

> [!IMPORTANT]
> **تنبيه للمطورين والمشرفين:**
> تأكد من تفعيل جميع الـ **Privileged Gateway Intents** (Presence Intent, Server Members Intent, Message Content Intent) في [Discord Developer Portal](https://discord.com/developers/applications) قبل تشغيل البوت لضمان عمل كافة ميزات التتبع والترحيب والرسائل.

---

## 🏗️ هيكلية ومعمارية النظام (System Architecture)

```mermaid
graph TD
    Client[📱 Discord Users & Guilds] -->|Slash & Prefix Commands| Bot[🤖 E-246 V2 Core Engine]
    Bot -->|In-Memory Cache + Persistent Storage| Mongo[(🗄️ MongoDB Database)]
    Bot -->|Centralized Configuration| Config[⚙️ config.js]
    Bot -->|Daily Automated Snapshot| Backup[💾 Backup Scheduler]
    Backup -->|Local Archive| Disk[📂 backups/*.json]
    Backup -->|Cloud Discord Webhook| WebhookChannel[📦 Discord Backup Webhook]
    
    WebAdmin[👑 Server Managers] -->|OAuth2 Authentication| Dashboard[🌐 Web Dashboard (Express + EJS)]
    Dashboard -->|Real-time Guild Management| Bot
    Dashboard -->|Live Metrics & Health| LiveStatus[📊 Status Page /health]
```

---

## ✨ أبرز مميزات الإصدار الثاني (V2 Features)

### 🛡️ 1. نظام الحماية الشامل (Anti-Nuke & Protection)
- **مكافحة الهجمات والرايد (Anti-Raid):** كشف الانضمام الجماعي المفاجئ وطردهم تلقائياً.
- **مكافحة التخريب (Anti-Spam & Limits):** وضع حدود قصوى لحذف أو إنشاء الرومات، الرتب، وحظر الأعضاء مع تجريد الفاعل من رتبه وسحبه فوراً.
- **حماية الويبهوك (Anti-Webhook):** كشف وحذف الويبهوكات غير المصرح بها فور إنشائها.
- **حماية البوتات (Anti-Bot):** منع إضافة أي بوتات غير مصرح بها من قبل المشرفين وطرد البوت وتجريد المشرف.
- **القائمة البيضاء والسوداء (Whitelist / Blacklist):** استثناء الرتب والأعضاء الموثوقين وتحديد مستويات الأمان.

### 🎫 2. نظام التذاكر والدعم الفني المتقدم (Tickets System)
- دعم إنشاء تصنيفات مخصصة (أقسام دعم، شكاوى، مبيعات) لكل منها رتبة إدارية وروم مخصص.
- استلام التذاكر (`Claim`) وتوثيق الإداري المستلم في السجلات.
- نظام تقييم الإدارة (1-5 نجوم) مع نافذة منبثقة تفاعلية وإرسال التقييمات لروم محدد.
- استدعاء صاحب التذكرة (`/come`) عبر رسالة خاصة (DM) تحتوي على زر دخول مباشر وسريع.
- إغلاق، إعادة فتح، تغيير الاسم، وحذف التذكرة مع سجلات توثيقية.
- إمكانية تصميم وإرسال بانل التذاكر من لوحة التحكم أو من خلال أوامر السلاش.

### 🎙️ 3. الرومات الصوتية المؤقتة (Temp Voice Channels)
- إنشاء رومات صوتية خاصة تلقائياً عند دخول روم الإنشاء (Join to Create).
- واجهة تحكم متقدمة بالأزرار للمالك (قفل، فتح، إخفاء، كتم، طرد، تفويض، تغيير الاسم والحد الأقصى).
- نظام كاش سريع وإدارة الصلاحيات التلقائية وحذف الروم عند خلوه.

### 🏆 4. نظام المستويات والرانك (Leveling & Rank Cards)
- احتساب نقاط الخبرة (XP) والمستويات للرسائل الكتابية والتفاعل الصوتي (Voice XP).
- بطاقات رانك احترافية مصممة بمحرك Canvas تدعم اللغة العربية.
- لوحة شرف للمتصدرين (`/top`, `/topvoice`, `/topmessages`, `/topreactions`).

### 🎮 5. الألعاب الجماعية والبنك والاقتصاد (Games & Bank)
- ألعاب تفاعلية: **مافيا (Mafia)**، **السالفة (Salfa)**، **القنبلة (Bomb)**، **الكراسي (Chairs)**، **الألوان (Colors)**، **الأعلام (Flags)**، **الأسرع (Faster)**، و**الروليت (Roulette)**.
- نظام بنكي متكامل: رصيد، هدايا يومية (`/bank daily`)، وظائف ورواتب (`/bank job`)، تحويل أموال (`/bank transfer`)، شركات واستثمارات، قروض، وسرقة ومقامرة.

### 🎵 6. نظام الموسيقى (Lavalink Music System)
- تشغيل صوتي عالي الجودة يدعم سيرفرات Lavalink.
- دعم قوائم التشغيل والبحث والتحكم (تشغيل، إيقاف، تخطي، تكرار، مستوى الصوت، استمرار 24/7).

### 🌐 7. لوحة التحكم السحابية (Responsive Web Dashboard)
- تسجيل دخول آمن عبر Discord OAuth2.
- لوحة شاملة لإدارة كافة إعدادات السيرفر: الترحيب، الحماية، الفلتر الذكي، الردود التلقائية، صانع الإمبيد، الرسائل المثبتة، والتقديمات (Forms Application).
- صفحة مراقبة حية لاستهلاك الموارد وحالة السيرفر وقاعدة البيانات.

---

## 📂 أقسام الأوامر (Commands Reference)

| القسم | أبرز الأوامر | الوصف |
| :--- | :--- | :--- |
| 👑 **الإدارة** | `/ban`, `/kick`, `/timeout`, `/untimeout`, `/warn`, `/unwarn`, `/jail`, `/clear`, `/bc`, `/say`, `/lock`, `/unlock` | إدارة السيرفر وتطبيق العقوبات والتحذيرات والبث |
| 🛡️ **الحماية** | `/protection`, `/setup`, `/setlimits`, `/whitelist`, `/unwhitelist`, `/unblacklist` | إعداد وتخصيص أنظمة الحماية وحدود الإجراءات |
| 🎫 **التذاكر** | `/ticket-setup`, `/send-panel`, `/ticket`, `/open`, `/close`, `/delete`, `/come` | إنشاء وإدارة التذاكر وبطاقات الدعم واستدعاء الأعضاء |
| 🎙️ **الرومات المؤقتة** | `/tempvoice` | إعداد وتخصيص رومات الصوت التلقائية |
| 📊 **المستويات** | `/rank`, `/leaderboard`, `/top`, `/topvoice`, `/topmessages`, `/settings` | عرض الرتب ومستويات الصوت والنصوص |
| 🎮 **الألعاب** | `/game bomb`, `/game mafia`, `/game salfa`, `/game chairs`, `/game colors`, `/game flags`, `/game faster`, `/stopgame` | تشغيل الألعاب التفاعلية الجماعية في الروم |
| 💰 **البنك والمالية** | `/bank balance`, `/bank daily`, `/bank transfer`, `/bank salary`, `/bank job` (وأوامر البادئة بالعربي) | النظام الاقتصادي والمالي المتكامل |
| 🎵 **الموسيقى** | `/play`, `/pause`, `/resume`, `/skip`, `/stop`, `/queue`, `/nowplaying`, `/loop`, `/volume`, `/247` | تشغيل وإدارة الموسيقى من Lavalink |
| ⚙️ **التلقائيات** | `/autoline`, `/autotax`, `/autoboost`, `/autoreply`, `/setline`, `/tax` | الفواصل التلقائية، حساب الضريبة وشكر البوست |
| ℹ️ **العامة** | `/help`, `/user`, `/avatar`, `/banner`, `/server`, `/ping`, `/snipe`, `/suggest`, `/afk` | الأوامر العامة ومعلومات السيرفر والأعضاء |

---

## 🚀 دليل التثبيت والتشغيل السريع (Installation Guide)

### 1. المتطلبات الأساسية
- **Node.js**: الإصدار 18.0.0 أو أحدث.
- **MongoDB**: قاعدة بيانات محلية أو سحابية ([MongoDB Atlas](https://www.mongodb.com/atlas)).
- **Lavalink Server** (اختياري، لتشغيل الموسيقى).

### 2. تثبيت الاعتماديات
```bash
npm install
```

### 3. إعداد ملف المتغيرات البيئية (`.env`)
قم بإنشاء ملف باسم `.env` في المجلد الرئيسي واملأ البيانات المطلوبة:

```env
# بيانات بوت ديسكورد
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
CLIENT_SECRET=your_client_secret_here
OWNER_ID=your_discord_user_id_here

# معرف السيرفر (اختياري: لتحديث أوامر السلاش فوراً في سيرفرك)
GUILD_ID=your_test_guild_id_here

# لوحة التحكم (Dashboard)
PORT=3000
CALLBACK_URL=http://localhost:3000/auth/callback
DISABLE_DASHBOARD=false

# قاعدة البيانات (MongoDB URI)
MONGODB_URI=mongodb://localhost:27017/e246

# خوادم لافالنك لتشغيل الموسيقى (host:port:password)
LAVALINK_NODES=us.monkey-network.xyz:6074:zarDEV

# ويبهوك النسخ الاحتياطي التلقائي (اختياري)
BACKUP_WEBHOOK_URL=

# توكن حساب فحص النيترو والبوست (اختياري)
USER_TOKEN=
```

### 4. تشغيل البوت
```bash
# التشغيل المباشر
npm start

# أو التشغيل عبر PM2 للعمل المستمر بالخلفية
npm install -g pm2
pm2 start ecosystem.config.js
```

---

## 🛠️ الأوامر المساعدة في التطوير (Scripts)

```bash
# فحص وتدقيق الكود البرمجي (Lint Check)
npm run lint:check

# إصلاح التنسيق التلقائي
npm run format
```

---

<div align="center">
  <b>E-246 V2 System &copy; 2026</b><br>
  <sub>صنع بعناية وجودة واحترافية عالية</sub>
</div>
