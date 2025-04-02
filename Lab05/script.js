document.addEventListener('DOMContentLoaded', function() {
	
    const nameInput = document.getElementById('nameInput');
    const phoneInput = document.getElementById('phoneInput');
    const addBtn = document.getElementById('addBtn');
    const contactsList = document.getElementById('contactsList');
    
    loadContacts();
    
    addBtn.addEventListener('click', function() {
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        
        if (name && phone) {
            addContact(name, phone);
            nameInput.value = '';
            phoneInput.value = '';
            nameInput.focus();
        } else {
            alert('Пожалуйста, заполните оба поля');
        }
    });
    
    function addContact(name, phone) {

        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        
        contacts.push({ name, phone });
        
        localStorage.setItem('contacts', JSON.stringify(contacts));
        
        displayContacts();
    }
    
    function deleteContact(index) {
        
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        
        contacts.splice(index, 1);
        
        localStorage.setItem('contacts', JSON.stringify(contacts));
        
        displayContacts();
    }
    
    function displayContacts() {
        
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        
        contactsList.innerHTML = '';
        
        if (contacts.length === 0) {
            contactsList.innerHTML = '<p>Нет сохраненных контактов</p>';
            return;
        }
        
        contacts.forEach((contact, index) => {
            const contactItem = document.createElement('div');
            contactItem.className = 'contact-item';
            
            const contactInfo = document.createElement('div');
            contactInfo.className = 'contact-info';
            contactInfo.innerHTML = `<strong>${contact.name}</strong>: ${contact.phone}`;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Удалить';
            deleteBtn.addEventListener('click', () => deleteContact(index));
            
            contactItem.appendChild(contactInfo);
            contactItem.appendChild(deleteBtn);
            
            contactsList.appendChild(contactItem);
        });
    }
    
    function loadContacts() {
        displayContacts();
    }
});