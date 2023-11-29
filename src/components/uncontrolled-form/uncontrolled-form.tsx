import { AppRoute } from '../../const';

export default function UncontrolledForm() {
  return (
    <>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Submit</button>
      </form>

      <a href={AppRoute.Root}>
        <p>Back to main</p>
      </a>
    </>
  );
}
