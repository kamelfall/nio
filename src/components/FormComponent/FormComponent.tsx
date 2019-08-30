import React from 'react';

interface IFormProps {

}

interface IFormState {
  date: any
}

export class FormComponent extends React.Component<IFormProps, IFormState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <form>

      </form>
    );
  }
}

export default FormComponent;