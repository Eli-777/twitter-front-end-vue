import axios from 'axios'
import Swal from 'sweetalert2'
	const baseURL = 'https://simple-twitter-jez.herokuapp.com'
	const axiosInstance = axios.create({
    baseURL
  })
  
  axiosInstance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token')
  
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    err => Promise.reject(err)
  )
  export const apiHelper = axiosInstance


// const baseURL = 'https://simple-twitter-jez.herokuapp.com/'

// export const apiHelper = axios.create({
//   baseURL
// })

	export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})
