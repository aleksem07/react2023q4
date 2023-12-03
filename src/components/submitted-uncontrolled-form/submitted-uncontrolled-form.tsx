import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function SubmittedUncontrolledForm() {
  const uncontrolledFormData = useSelector(
    (state: RootState) => state.uncontrolledForm
  );
  return (
    <div>
      <h3>Submitted Uncontrolled Form</h3>

      <p>Name: {uncontrolledFormData.name}</p>
      <p>Age: {uncontrolledFormData.age}</p>
      <p>Email: {uncontrolledFormData.email}</p>
      <p>Password: {uncontrolledFormData.password}</p>
      <p>Confirm Password: {uncontrolledFormData.confirmPassword}</p>
      <p>Gender: {uncontrolledFormData.gender}</p>
      <p>Accept TC: {uncontrolledFormData.acceptTC.toString()}</p>
      <p>Country: {uncontrolledFormData.country}</p>
      <p style={{ wordBreak: 'break-all' }}>Pic: {uncontrolledFormData.pic}</p>
    </div>
  );
}
