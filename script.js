// cursor
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      rx += (e.clientX - rx) * 0.12;
      ry += (e.clientY - ry) * 0.12;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    });
    function animateCursor() {
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    document.querySelectorAll('a, button, .artist-card, .album-card, .genre-pill').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.style.transform += ' scale(2)'; cursor.style.background = '#c9b6e4'; });
      el.addEventListener('mouseleave', () => { cursor.style.background = '#f4a7c0'; });
    });

    // floating music notes
    const notesBg = document.getElementById('notesBg');
    const noteSymbols = ['♩','♪','♫','♬','𝄞'];
    for (let i = 0; i < 18; i++) {
      const n = document.createElement('div');
      n.className = 'note';
      n.textContent = noteSymbols[Math.floor(Math.random() * noteSymbols.length)];
      n.style.left = Math.random() * 100 + '%';
      n.style.animationDuration = (12 + Math.random() * 18) + 's';
      n.style.animationDelay = '-' + (Math.random() * 30) + 's';
      n.style.fontSize = (1.2 + Math.random() * 1.8) + 'rem';
      notesBg.appendChild(n);
    }

    // scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => obs.observe(r));

    // smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
      });
    });