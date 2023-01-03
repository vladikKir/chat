import Add from './Add';

const modals = {
  unactive: '',
  add: <Add />,
};

export default (modalName) => modals[modalName];
