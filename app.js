const toast = (message) => {
  const element = document.querySelector('#toast');
  if (!element) return;
  element.textContent = message;
  element.classList.add('show');
  setTimeout(() => element.classList.remove('show'), 2400);
};

document.querySelectorAll('.upload input[type="file"]').forEach((input) => {
  input.addEventListener('change', () => {
    const file = input.files?.[0];
    const photo = input.closest('.polaroid')?.querySelector('.photo');
    if (!file || !photo) return;
    const image = document.createElement('img');
    image.alt = 'Your memory';
    image.src = URL.createObjectURL(file);
    photo.replaceChildren(image);
  });
});

document.querySelector('#videoFile')?.addEventListener('change', (event) => {
  const file = event.target.files?.[0];
  const box = document.querySelector('#videoBox');
  if (!file || !box) return;
  const video = document.createElement('video');
  video.controls = true;
  video.autoplay = true;
  video.src = URL.createObjectURL(file);
  box.replaceChildren(video);
});

document.querySelector('#wish')?.addEventListener('click', () => {
  for (let i = 0; i < 55; i++) {
    const sparkle = document.createElement('i');
    sparkle.textContent = ['♥', '✦', '✧'][Math.floor(Math.random() * 3)];
    sparkle.style.cssText = `position:fixed;z-index:30;left:${Math.random()*100}vw;top:${Math.random()*80+10}vh;color:${Math.random()>.5?'#ff4887':'#ffd1df'};font-size:${12+Math.random()*20}px;pointer-events:none;transition:transform 1.6s ease,opacity 1.6s;`;
    document.body.append(sparkle);
    requestAnimationFrame(() => {
      sparkle.style.transform = `translate(${Math.random()*150-75}px,${-160-Math.random()*300}px) rotate(${Math.random()*180}deg)`;
      sparkle.style.opacity = '0';
    });
    setTimeout(() => sparkle.remove(), 1700);
  }
  toast('May this year bring you everything you wish for!');
});

// Animate same-site page links before navigating to the next slide.
document.querySelectorAll('a[href]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const destination = new URL(link.href, location.href);
    if (destination.origin !== location.origin || destination.pathname === location.pathname || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    document.body.classList.add('page-leaving');
    const delay = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 240;
    setTimeout(() => { location.href = destination.href; }, delay);
  });
});

document.querySelector('#logout')?.addEventListener('click', () => {
  sessionStorage.removeItem('birthdayUnlocked');
  document.body.classList.add('page-leaving');
  const delay = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 240;
  setTimeout(() => { location.href = 'index.html'; }, delay);
});
