(() => {
  const diffLabels = ['easy', 'normal', 'hard', 'oni', 'edit'];
  const songs = [...document.querySelectorAll('tr')]
    .filter(row => row.querySelector('th') && row.querySelectorAll('td').length >= 5)
    .map(row => {
      const th = row.querySelector('th');
      const tds = row.querySelectorAll('td');
      
      const titleEl = th.cloneNode(true);
      titleEl.querySelectorAll('span, p').forEach(el => el.remove());
      
      const difficulties = {};
      diffLabels.forEach((label, i) => {
        const val = tds[i + 1]?.textContent.trim();
        difficulties[label] = (val && val !== '-') ? parseInt(val, 10) : null;
      });

      // アーティスト名も含めたいならコメントアウトしてるやついれる
      return {
        title: titleEl.textContent.trim(),
        // artist: (th.querySelector('p')?.textContent || '').trim(),
        difficulties
      };
    });

  const blob = new Blob([JSON.stringify(songs, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'songs.json';
  a.click();
  URL.revokeObjectURL(url);
})();
