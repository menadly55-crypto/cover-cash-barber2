function saveData() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();

    if (name === "" || phone === "") {
        alert("من فضلك أدخل الاسم ورقم الهاتف!");
        return;
    }

    // 1. معرفة اسم الحلاق من رابط صفحة التسجيل
    let urlParams = new URLSearchParams(window.location.search);
    let barberId = urlParams.get('barber') || "default_barber";

    // 2. قراءة قائمة العملاء الخاصة بهذا الحلاق تحديداً (اسم المفتاح مربوط بالـ barberId)
    let storageKey = `clients_${barberId}`;
    let clients = JSON.parse(localStorage.getItem(storageKey)) || [];

    // 3. تجهيز بيانات العميل الجديد
    let newClient = {
        name: name,
        phone: phone,
        visits: 0,
        lastVisitDate: null
    };

    // 4. إضافة العميل للقائمة وحفظها لحساب هذا الحلاق فقط
    clients.push(newClient);
    localStorage.setItem(storageKey, JSON.stringify(clients));
    
    // حفظ الهاتف الحالي والـ ID لصفحة الـ welcome
    localStorage.setItem("currentClientPhone", phone);
    localStorage.setItem("currentClientBarber", barberId);

    // 5. التوجيه لصفحة الترحيب
    window.location.href = "welcome.html";
}