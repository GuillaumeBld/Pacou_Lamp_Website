document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  try {
    const listRes = await fetch('data/lamps/index.json');
    const files = await listRes.json();
    const lamps = await Promise.all(files.map(f => fetch(`data/lamps/${f}`).then(r => r.json())));

    lamps.forEach(lamp => {
      const card = document.createElement('div');
      card.className = 'card';

      const link = document.createElement('a');
      link.href = `catalog.html?lamp=${lamp.id}`;
      link.style.textDecoration = 'none';
      link.style.color = 'inherit';

      const img = document.createElement('img');
      img.src = lamp.image || 'https://via.placeholder.com/200x250?text=No+Image';
      img.alt = lamp.name;

      const title = document.createElement('h3');
      title.textContent = lamp.name;

      const price = document.createElement('p');
      price.className = 'catalog-price';
      price.textContent = lamp.price ? `${lamp.price} €` : '';

      const btn = document.createElement('button');
      btn.className = 'catalog-btn';
      btn.textContent = 'Découvrir';

      link.appendChild(img);
      link.appendChild(title);
      link.appendChild(price);
      link.appendChild(btn);
      card.appendChild(link);

      if (lamp.status) {
        const badge = document.createElement('span');
        badge.className = 'badge';
        if (lamp.status === 'sold') {
          badge.textContent = 'SOLD';
        } else if (lamp.status === 'sale') {
          badge.textContent = 'SALE';
          badge.style.background = '#f60';
        }
        card.appendChild(badge);
      }

      grid.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load lamps:', err);
  }
});
