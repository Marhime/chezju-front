<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.ContactFormSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

// État du formulaire
const formData = ref({
  email: "",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);
const submitMessage = ref("");
const submitSuccess = ref(false);

// Validation
const errors = ref({
  email: "",
  subject: "",
  message: "",
});

const validateForm = () => {
  errors.value = { email: "", subject: "", message: "" };
  let isValid = true;

  // Validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.value.email) {
    errors.value.email = "L'email est requis";
    isValid = false;
  } else if (!emailRegex.test(formData.value.email)) {
    errors.value.email = "Format d'email invalide";
    isValid = false;
  }

  // Validation sujet
  if (!formData.value.subject || formData.value.subject.length < 3) {
    errors.value.subject = "Le sujet doit contenir au moins 3 caractères";
    isValid = false;
  }

  // Validation message
  if (!formData.value.message || formData.value.message.length < 10) {
    errors.value.message = "Le message doit contenir au moins 10 caractères";
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  submitMessage.value = "";

  try {
    const response = await $fetch("/api/contact", {
      method: "POST",
      body: formData.value,
    });

    if (!response || !response.success) {
      throw new Error("Échec de l'envoi du formulaire");
    }

    submitSuccess.value = true;
    submitMessage.value =
      "Message envoyé avec succès ! Nous vous répondrons bientôt.";

    // Reset form
    formData.value = { email: "", subject: "", message: "" };
  } catch (error) {
    submitSuccess.value = false;
    submitMessage.value = "Une erreur est survenue. Veuillez réessayer.";
    console.error("Erreur envoi formulaire:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <div class="py-10 px-4 mx-auto max-w-screen-md">
      <!-- Message de confirmation/erreur -->
      <div
        v-if="submitMessage"
        :class="[
          'mb-10 font-semibold text-center',
          submitSuccess ? 'text-secondary' : 'text-red-700',
        ]"
      >
        {{ submitMessage }}
      </div>

      <form @submit.prevent="submitForm" class="space-y-8">
        <!-- Email -->
        <div>
          <label for="email" class="block mb-2 text-sm font-medium">
            Votre email *
          </label>
          <input
            v-model="formData.email"
            type="email"
            id="email"
            :class="[
              'bg-light border text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5',
              errors.email ? 'border-red-500' : 'border-gray-300',
            ]"
            placeholder="votre.email@exemple.com"
            required
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">
            {{ errors.email }}
          </p>
        </div>

        <!-- Sujet -->
        <div>
          <label
            for="subject"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Sujet *
          </label>
          <input
            v-model="formData.subject"
            type="text"
            id="subject"
            :class="[
              'block p-3 w-full text-sm text-gray-900 bg-light rounded-sm border focus:ring-primary-500 focus:border-primary-500',
              errors.subject ? 'border-red-500' : 'border-gray-300',
            ]"
            placeholder="Comment pouvons-nous vous aider ?"
            required
          />
          <p v-if="errors.subject" class="mt-1 text-sm text-red-600">
            {{ errors.subject }}
          </p>
        </div>

        <!-- Message -->
        <div class="sm:col-span-2">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Votre message *
          </label>
          <textarea
            v-model="formData.message"
            id="message"
            rows="6"
            :class="[
              'block p-2.5 w-full text-sm text-gray-900 bg-light rounded-sm border focus:ring-primary-500 focus:border-primary-500',
              errors.message ? 'border-red-500' : 'border-gray-300',
            ]"
            placeholder="Écrivez votre message ici..."
            required
          ></textarea>
          <p v-if="errors.message" class="mt-1 text-sm text-red-600">
            {{ errors.message }}
          </p>
        </div>

        <!-- Bouton submit -->
        <button
          type="submit"
          :disabled="isSubmitting"
          :class="[
            'mx-auto block py-3 px-5 text-sm font-medium text-center text-white rounded-sm sm:w-fit focus:ring-4 focus:outline-none bg-primary cursor-pointer hover:bg-primary/90',
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : '',
          ]"
        >
          {{ isSubmitting ? "Envoi en cours..." : "Envoyer le message" }}
        </button>
      </form>
    </div>
  </section>
</template>
