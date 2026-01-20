# VEROOM — GitHub Pages MVP

هذه نسخة MVP تعمل على **الكمبيوتر والجوال** بعد نشرها على GitHub Pages.

## الصفحات
- `index.html` الصفحة الرئيسية
- `store-eyewear.html` متجر النظارات (منتجات وهمية + زر جرّبه الآن)
- `room-eyewear.html` غرفة تجربة النظارات 3D (WebGL + Three.js من CDN)

## تشغيل محلي (اختياري)
يمكن فتح `index.html` محليًا، لكن غرفة 3D تحتاج إنترنت لأنها تستورد Three.js من CDN.

## نشر على GitHub Pages
1) أنشئ مستودع جديد: `veroom`
2) ارفع ملفات المشروع كما هي (root)
3) Settings → Pages
4) Source: Deploy from a branch
5) Branch: `main` / folder: `/ (root)` → Save
6) رابطك يصبح:
`https://USERNAME.github.io/veroom/`
