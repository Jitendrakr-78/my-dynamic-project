const saveBtn = document.getElementById('saveBtn');
const showBtn = document.getElementById('showBtn');
const field1Input = document.getElementById('field1');
const field2Input = document.getElementById('field2');
const dataDisplay = document.getElementById('dataDisplay');

// Save Button Click Logic
saveBtn.addEventListener('click', async () => {
    const field1 = field1Input.value.trim();
    const field2 = field2Input.value.trim();

    if (!field1 || !field2) {
        alert('Please fill both fields!');
        return;
    }

    try {
        const response = await fetch('/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ field1, field2 })
        });
        const result = await response.json();
        alert(result.message || 'Error saving data');
        
        // Input fields clear karne ke liye
        field1Input.value = '';
        field2Input.value = '';
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to save data.');
    }
});

// Show Button Click Logic
showBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/show');
        const data = await response.json();

        dataDisplay.innerHTML = ''; // Purana data clear karein

        if (data.length === 0) {
            dataDisplay.innerHTML = '<p class="data-item">No records found.</p>';
            return;
        }

        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'data-item';
            div.innerHTML = `<strong>Field 1:</strong> ${item.field1} | <strong>Field 2:</strong> ${item.field2}`;
            dataDisplay.appendChild(div);
        });
    } catch (error) {
        console.error('Error:', error);
        dataDisplay.innerHTML = '<p style="color:red;">Failed to fetch data.</p>';
    }
});
