// Fonction pour afficher/cacher la section des commentaires avec émojis
function toggleEmojiCommentSection() {
  const emojiSection = document.getElementById('emojiCommentSection');
  if (emojiSection.style.display === 'none' || emojiSection.style.display === '') {
    emojiSection.style.display = 'block'; // Afficher
  } else {
    emojiSection.style.display = 'none'; // Cacher
  }
}

// Fonction pour afficher un émoji sélectionné en grand sur tout l'écran
function displayEmojiFullScreen(emoji) {
  // Créer un conteneur pour afficher l'émoji
  const emojiOverlay = document.createElement('div');
  emojiOverlay.style.position = 'fixed';
  emojiOverlay.style.top = '0';
  emojiOverlay.style.left = '0';
  emojiOverlay.style.width = '100%';
  emojiOverlay.style.height = '100%';
  emojiOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  emojiOverlay.style.display = 'flex';
  emojiOverlay.style.justifyContent = 'center';
  emojiOverlay.style.alignItems = 'center';
  emojiOverlay.style.zIndex = '10000';
  emojiOverlay.style.animation = 'fadeOut 2s ease forwards';

  // Ajouter l'émoji au conteneur
  const emojiElement = document.createElement('span');
  emojiElement.textContent = emoji;
  emojiElement.style.fontSize = '10rem'; // Taille de l'émoji
  emojiElement.style.color = '#fff';

  emojiOverlay.appendChild(emojiElement);
  document.body.appendChild(emojiOverlay);

  // Supprimer le conteneur après l'animation
  setTimeout(() => {
    emojiOverlay.remove();
  }, 2000); // Durée de l'affichage (2s)
}

// Fonction pour soumettre un commentaire avec un émoji
function submitEmojiComment(emoji) {
  displayEmojiFullScreen(emoji); // Afficher l'émoji en grand
  toggleEmojiCommentSection(); // Fermer la section des commentaires
}

// Fonction pour afficher des bananes à un endroit aléatoire
function showBananas() {
  for (let i = 0; i < 10; i++) {
    const banana = document.createElement('span');
    banana.classList.add('banana-emoji');
    banana.textContent = '🍌';

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    banana.style.left = `${x}px`;
    banana.style.top = `${y}px`;

    document.body.appendChild(banana);

    setTimeout(() => {
      banana.remove();
    }, 3000);
  }
}
