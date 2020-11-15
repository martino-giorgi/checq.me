n1 = document.getElementById('nav-1');
n2 = document.getElementById('nav-2');
n3 = document.getElementById('nav-3');
n4 = document.getElementById('nav-4');
n5 = document.getElementById('nav-5');

function assignEvents(nav_n, svg_n, name) {
    if (!nav_n.classList.contains('active')) {
        nav_n.addEventListener('mouseenter', () => {
            document.getElementById(`${svg_n}`).src = `assets/icons/nav/${name}_sel.svg`
        })
        
        nav_n.addEventListener('mouseleave', () => {
            document.getElementById(`${svg_n}`).src = `assets/icons/nav/${name}.svg`;
        })
    }
}

assignEvents(n1, 'svg1','dashboard');
assignEvents(n2, 'svg2', 'classroom');
assignEvents(n3, 'svg3', 'schedule');
assignEvents(n4, 'svg4', 'manager');
assignEvents(n5, 'svg5', 'profile');
