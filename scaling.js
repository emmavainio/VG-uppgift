document.addEventListener('DOMContentLoaded', function () {
    console.log(document.getElementById('electronics'));

    if (window.innerWidth < 550) {
        document.getElementById('electronics').textContent = 'Elect..';
        document.getElementById('mens').textContent = 'Men\'s';
        document.getElementById('womens').textContent = 'Women\'s';
        document.getElementById('jewelry').textContent = 'Jewelry';

    } else if (window.innerWidth < 700) {
        document.getElementById('electronics').textContent = 'Electronics';
        document.getElementById('mens').textContent = 'Men\'s';
        document.getElementById('womens').textContent = 'Women\'s';
        document.getElementById('jewelry').textContent = 'Jewelry';

    } else {
        document.getElementById('electronics').textContent = 'Electronics';
        document.getElementById('mens').textContent = 'Men\'s Clothing';
        document.getElementById('womens').textContent = 'Women\'s Clothing';
        document.getElementById('jewelry').textContent = 'Jewelry';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    console.log(document.getElementById('electronics'));
    window.addEventListener('resize', function () {

        if (window.innerWidth < 550) {
            document.getElementById('electronics').textContent = 'Elect..';
            document.getElementById('mens').textContent = 'Men\'s';
            document.getElementById('womens').textContent = 'Women\'s';
            document.getElementById('jewelry').textContent = 'Jewelry';

        } else if (window.innerWidth < 700) {
            document.getElementById('electronics').textContent = 'Electronics';
            document.getElementById('mens').textContent = 'Men\'s';
            document.getElementById('womens').textContent = 'Women\'s';
            document.getElementById('jewelry').textContent = 'Jewelry';

        } else {
            document.getElementById('electronics').textContent = 'Electronics';
            document.getElementById('mens').textContent = 'Men\'s Clothing';
            document.getElementById('womens').textContent = 'Women\'s Clothing';
            document.getElementById('jewelry').textContent = 'Jewelry';
        }
    });
});