let selectedStars = 0;

function highlightStars(starIndex) {
  const stars = Array.from(document.getElementsByClassName('star'));

  for (let i = 0; i < stars.length; i++) {
    if (i <= starIndex) {
      stars[i].classList.add('highlight');
    } else {
      stars[i].classList.remove('highlight');
    }
  }
}

function resetStars() {
  const stars = Array.from(document.getElementsByClassName('star'));
  stars.forEach(star => star.classList.remove('highlight'));
}

function rate(starIndex) {
  selectedStars = starIndex + 1;
  highlightStars(starIndex);
}

function submitComment() {
  const name = document.getElementById('name').value.trim();
  const commentText = document.getElementById('comment-text').value.trim();

  if (name && commentText && selectedStars > 0) {
    const commentList = document.getElementById('comments-list');

    const commentItem = document.createElement('li');
    commentItem.classList.add('comment-item');

    const commentContent = document.createElement('p');
    commentContent.innerHTML = `<strong>${name}</strong>: ${commentText}`;

    const rating = document.createElement('div');
    rating.classList.add('rating');
    for (let i = 0; i < 5; i++) {
      const star = document.createElement('span');
      star.innerHTML = '&#9733;';
      star.classList.add('star');
      if (i < selectedStars) {
        star.classList.add('highlight');
        star.classList.add('orange'); // Agregar la clase 'orange' a las estrellas destacadas
      } else {
        star.classList.remove('highlight');
        star.classList.remove('orange'); // Asegurarse de que las estrellas no destacadas no tengan la clase 'orange'
      }
      star.style.pointerEvents = 'none'; // Evita la interacción con las estrellas
      rating.appendChild(star);
    }

    commentItem.appendChild(commentContent);
    commentItem.appendChild(rating);
    commentList.appendChild(commentItem);

    // Limpiar el formulario y reiniciar estrellas seleccionadas
    document.getElementById('name').value = '';
    document.getElementById('comment-text').value = '';
    selectedStars = 0;
    resetStars();
  } else {
    alert('Por favor, completa todos los campos y selecciona una puntuación.');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const stars = Array.from(document.getElementsByClassName('star'));

  stars.forEach((star, index) => {
    star.addEventListener('mouseover', () => highlightStars(index));
    star.addEventListener('mouseout', resetStars);
    star.addEventListener('click', () => rate(index));
  });
});