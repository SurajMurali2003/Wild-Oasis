import toast from 'react-hot-toast';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useEditSetting } from './useEditSetting';

function UpdateSettingsForm() {

  const { settings: {
    minBookingLength,
    maxBookingLength,
    maxGuestPerBokking,
    breakfastPrice,
  } = {}, isLoading } = useSettings();
  
  const { isLoading: isEditing, updateSetting }=  useEditSetting();

  function handleUpdate(e, name) {
    const value = e.target.value;

    if (!value) return;
  
    updateSetting({[name]: value})
}

if(isLoading) return <Spinner/>
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' onBlur={(e) => handleUpdate(e, "minBookingLength")}
          defaultValue={minBookingLength} disabled={isEditing} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          defaultValue={maxBookingLength} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' onBlur={(e) => handleUpdate(e, "maxGuestPerBokking")}
          defaultValue={maxGuestPerBokking} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          defaultValue={breakfastPrice} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
