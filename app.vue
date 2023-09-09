<script setup>
const config = useRuntimeConfig()
const { $scrollToElement } = useNuxtApp()

const isLoading = ref(false)
const requestMade = ref(false)
const errors = ref([])

// Contact form refs
const name = ref('')
const email = ref('')
const phone = ref('')
const text = ref('')

/**
 * Validates each form ref.
 */
const validateForm = () => {
  errors.value = []
  if (name.value === '')
    errors.value.push('Name is required.')

  if (email.value === '')
    errors.value.push('Email is required.')

  if (phone.value === '')
    errors.value.push('Phone number is required.')
  else {
    const formattedPhone = phone.value.split('-').join('').split('.').join('')
    phone.value = formattedPhone
  }

  if (errors.value.length > 0) return false
  else return true
}

/**
 * If form data is valid, sends an API request to Stoke to create a contact request.
 * @param {Object} e The form-submission event param.
 */
const sendInquiry = async (e) => {
  e.preventDefault()

  if (!validateForm())
    return

  isLoading.value = true

  const req = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    text: text.value

  }

  setTimeout(async () => {
    const response = await fetch(`${config.apiUrl}/request`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(req)
    })

    isLoading.value = false

    if (response.ok)
      requestMade.value = true
  }, 2000)

} 
</script>

<template>
  <div class="navbar">
    <div class="logo large-font">StokeTech</div>
    <div class="nav medium-font">
      <a @click="$scrollToElement('#home')">Home</a>
      <a @click="$scrollToElement('#about')">About</a>
      <a @click="$scrollToElement('#projects')">Projects</a>
      <a @click="$scrollToElement('#contact')">Contact</a>
    </div>
  </div>
  <div class="container" id="home">
    <section class="hero-section">
      <h1 class="large-font">StokeTech</h1>
      <div class="col" style="border-left: 1px solid #eee;">
        <p class="medium-font">Modernizing your tech stack and building solutions to accelerate your business.</p>
        <a @click="$scrollToElement('#contact')" class="primary-btn medium-font">Contact Us</a>
      </div>
    </section>
    <div class="mouse-outer">
      <div @click="$scrollToElement('#about')" class="mouse"></div>
    </div>
  </div>
  <div class="container" id="about">
    <section class="text-container">
      <h1 class="medium-font" style="margin-top: 0;">About StokeTech</h1>
      <p class="small-font">At StokeTech, we are more than just a team of software developers. We are passionate problem
        solvers, innovative thinkers, and technology enthusiasts committed to delivering exceptional results. With a
        proven track record in working with industry leaders like AT&T and Entech, we bring a wealth of experience and
        expertise to every project.</p>
      <h1 class="medium-font">Our Mission</h1>
      <p class="small-font">Our mission is simple: to empower businesses through technology. We believe that well-crafted
        software solutions can transform the way companies operate, enhance their efficiency, and drive growth. We
        leverage our skills in .NET, Ruby on Rails, and frontend technologies like React and Vue to create tailor-made
        solutions that exceed your expectations.</p>
      <h1 class="medium-font">Why Choose StokeTech</h1>
      <section class="skillset small-font">
        <section>
          <div>
            <Icon name="carbon:assembly-cluster" color="white" />
            <span class="bold">Experience</span>
          </div>
          <p>
            Our team has a solid history of successful projects with industry giants, showcasing our ability to tackle
            complex challenges.
          </p>
        </section>
        <section>
          <div>
            <Icon name="carbon:api" color="white" />
            <span class="bold">Expertise</span>
          </div>
          <p>
            We specialize in a wide range of technologies, ensuring that we can choose
            the best tools for your specific needs.
          </p>
        </section>
        <section>
          <div>
            <Icon name="carbon:branch" color="white" />
            <span class="bold">Collaboration</span>
          </div>
          <p>We view our clients as partners, fostering open communication and
            collaboration to achieve shared goals.
          </p>
        </section>
      </section>
    </section>
  </div>
  <div class="container" id="projects">
    test
  </div>
  <div class="container" id="contact">
    <div class="contact-form">
      <h1>Get in Touch</h1>
      <section v-if="isLoading" class="loading">
        <p>Sending</p>
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
      </section>
      <form v-else-if="!isLoading && !requestMade" @submit="sendInquiry">
        <label>Name</label>
        <input type="text" required v-model="name">
        <label>Email</label>
        <input type="email" required v-model="email">
        <label>Phone (ex ###-###-####)</label>
        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required v-model="phone">
        <label>How can we help?</label>
        <textarea v-model="text" />
        <button type="submit">Send</button>
      </form>
      <section v-else>
        <h2>Thank you!</h2>
        <p>We will reach out to you soon!</p>
      </section>
    </div>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden;
}

body,
html {
  background: rgb(39, 39, 39);

}

.large-font {
  font-size: 3rem;
}

.medium-font {
  font-size: 1.8rem;
}

.small-font {
  font-size: 1.5rem;
}

.col {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.primary-btn {
  display: inline-block;
  padding: 1rem;
  width: 100%;
  border-radius: 15px;
  background: #c21858;
  color: #ddd;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all .1s ease-in-out;

  &:hover {
    filter: brightness(150%);
  }
}

.mouse-outer {
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);

  .mouse {
    z-index: 50;
    width: 60px;
    height: 108px;
    border: 4px solid #eee;
    border-radius: 60px;
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
      border: 4px solid #fff;
    }

    &::before {
      content: "";
      width: 25px;
      height: 25px;
      position: absolute;
      top: 30px;
      background: #ddd;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50%;
      opacity: 1;
      animation: mouse 2s infinite;
    }
  }
}

@keyframes mouse {
  from {
    opacity: 1;
    top: 20px;
  }

  to {
    opacity: 0;
    top: 80px;
  }
}

.bold {
  font-weight: bold;
  color: #eee;
}

.navbar {
  background: rgb(28, 28, 28);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: fixed;
  height: 64px;
  color: #ddd;
  overflow-y: hidden;
  z-index: 100;

  .logo {
    margin: 1rem;
  }

  .nav {
    display: inherit;
    align-items: inherit;
    justify-content: space-evenly;
    width: 22%;
    height: 100%;
    cursor: pointer;
    transition: all ease-in-out .3s;

    a {
      color: #bbb;
      text-decoration: none;

      &:hover {
        color: #fff;
        text-decoration: none;
      }
    }
  }
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  h1 {
    color: #eee;
    margin-right: 1rem;
  }

  p,
  ul,
  li {
    color: #ccc;
  }

  span {
    margin-left: .4rem;
  }

  li {
    display: flex;
    align-items: center;
    height: 5rem;
  }
}

.skillset {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;

  section {
    color: #ddd;
    width: 24%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      text-align: center;
      margin-bottom: 1rem;
    }

    p {
      text-align: center;
    }
  }
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  width: 80%;
  padding: 2rem;
  background: rgba(204, 24, 93, 0.2);
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  h1 {
    margin: 3.5rem 0 2rem 0;
    display: inline-block;
    width: 100%;
    text-align: center;
  }

  p,
  ul,
  li {
    line-height: 1.4;
  }

  ul {
    list-style: disc;
  }
}

.hero-section {
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
  margin: 1rem auto;

  h1,
  p {
    padding: .5rem;
  }

  h1 {
    text-align: right;
  }

  .col {
    width: 30%;
  }

  p {
    display: inline-block;
  }
}

#contact {
  color: #ddd;

  .contact-form {
    width: 80%;
    background: rgba(20, 20, 20, .6);
    padding: 5rem;
    border-radius: 1rem;
    min-height: 400px;

    form {
      display: flex;
      flex-direction: column;
      width: 50%;
      margin: 1rem auto;
    }
  }
}

/* Spinner */
.spinner {
  width: 40px;
  height: 40px;

  position: relative;
  margin: 100px auto;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@-webkit-keyframes sk-bounce {

  0%,
  100% {
    -webkit-transform: scale(0.0)
  }

  50% {
    -webkit-transform: scale(1.0)
  }
}

@keyframes sk-bounce {

  0%,
  100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  }

  50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>