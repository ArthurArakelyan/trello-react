const formCollapseWithTextarea = () => (setForm, setValue, value = '', opening) => {
  setForm(collapsed => !collapsed);

  if(opening && value) {
    setTimeout(() => setValue(value), 10);
  } else {
    setValue('');
  }
}

export default formCollapseWithTextarea;
