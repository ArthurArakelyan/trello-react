const useFormCollapse = () => (setForm, setValue, value = '') => {
  setForm(boolean => {
    return !boolean;
  });
  setValue(value);
}

export default useFormCollapse;
