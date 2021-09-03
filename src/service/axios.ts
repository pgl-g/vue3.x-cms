import axios from 'axios'

// axios实例对象

// promise本事是可以有类型的
new Promise<string>((resolve, reject) => {
  resolve('avb')
}).then((res) => {
  console.log(res.length)
})
