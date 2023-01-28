import notify from 'devextreme/ui/notify';

const successMsg = () => {
  const message = `Success`;
  notify(
    {
      message,
      position: {
        my: 'center top',
        at: 'center top',
      },
    },
    'success',
    3000
  );
};

const errorMsg = () => {
  const message = `Error`;
  notify(
    {
      message,
      position: {
        my: 'center top',
        at: 'center top',
      },
    },
    'error',
    3000
  );
};

export { errorMsg, successMsg };
