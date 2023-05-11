import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import RepositoriesListItem from './RepositoriesListItem';

// OPTION 2 to solve the act() warning:
// jest.mock('../tree/FileIcon', () => {
//   return () => {
//     return 'File Icon Component';
//   };
// });

function renderComponent() {
  const repository = {
    full_name: 'facebook/react',
    language: 'Javascript',
    description: 'Awesome UI library',
    owner: 'facebook',
    name: 'react',
    html_url: 'https://example.com/react',
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );
}

test('Shows a link to the github homepage for this repository', async () => {
  renderComponent();

  // OPTION 1 to solve the act() warning:
  //   await screen.findByRole('img', {
  //     name: 'Javascript',
  //   });
});

const pause = () => {
  return Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
};
