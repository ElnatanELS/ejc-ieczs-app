export function formatDateInput(value:string){
   const format =value?.replace(/\D/g, "")
  .replace(/(\d{2})(\d)/, "$1/$2")
  .replace(/(\d{2})(\d)/, "$1/$2")
  .replace(/(\d{4})(\d)/, "$1")


  const datesplit = format.split('/')



  const date = new Date(Number(datesplit[2]),Number(datesplit[1]) - 1, Number(datesplit[0]))


  return  ( ((date.getMonth() + 1))+ "/" + (date.getDate() ) + "/" + date.getFullYear()  )
}

export function formatDateTable(value:string){
  const date = new Date(value)

  return  ((date.getDate().toString().padStart(2, "0") ) + "/" + ((date.getMonth() + 1).toString().padStart(2, "0")) + "/" + date.getFullYear()  )
}
