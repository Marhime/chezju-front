<script setup>
const error = useError();
</script>

<template>
  <div class="error-page">
    <h1>{{ error.statusCode === 404 ? "Page introuvable" : "Erreur" }}</h1>
    <p v-if="error.statusCode === 404">
      Oups ! La page que tu cherches n’existe pas.
    </p>
    <p v-else>{{ error.message }}</p>
    <NuxtLink to="/">Retour à l'accueil</NuxtLink>
  </div>
</template>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 2rem;
  background-color: var(--color-primary);
}

h1 {
  font-family: "Montserrat", sans-serif;
  font-size: 3rem;
  text-transform: uppercase;
  font-weight: 900;
  color: var(--color-light);
}

p {
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  color: var(--color-light);
}

.error-page a {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-light);
  color: var(--color-primary);
  text-decoration: none;
  border-radius: 0.25rem;
  text-transform: uppercase;
  font-weight: bold;
}

@media screen and (min-width: 1024px) {
  h1 {
    font-size: 5rem;
  }

  p {
    font-size: 1.5rem;
  }
}
</style>
