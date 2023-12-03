import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function SubmittedReactHookForm() {
  const controlledFormData = useSelector(
    (state: RootState) => state.controlledForm
  );
  return (
    <div>
      <h3>Submitted Uncontrolled Form</h3>

      <p>Name: {controlledFormData.name}</p>
      <p>Age: {controlledFormData.age}</p>
      <p>Email: {controlledFormData.email}</p>
      <p>Password: {controlledFormData.password}</p>
      <p>Confirm Password: {controlledFormData.confirmPassword}</p>
      <p>Gender: {controlledFormData.gender}</p>
      <p>Accept TC: {controlledFormData.acceptTC.toString()}</p>
      <p>Pic: {controlledFormData.pic.toString()}</p>
      <p>Country: {controlledFormData.country}</p>
    </div>
  );
}
