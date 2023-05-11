import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import RepositoriesListItem from './RepositoriesListItem';

// OPTION 2 to solve the act() warning
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
    owner: {
      login: 'facebook',
    },
    name: 'react',
    html_url: 'https://example.com/react',
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

test('Shows a link to the github homepage for this repository', async () => {
  const { repository } = renderComponent();

  // OPTION 3 (the worst, hacky) to solve the act() warning
  // await act(async () => {
  //   await pause();
  // });

  // OPTION 1 to solve the act() warning
  await screen.findByRole('img', {
    name: 'Javascript',
  });

  const link = screen.getByRole('link', {
    name: /github repository/i,
  });
  expect(link).toHaveAttribute('href', repository.html_url);
});

test('shows a fileicon with the appropriate icon', async () => {
  renderComponent();

  const icon = await screen.findByRole('img', {
    name: 'Javascript',
  });

  expect(icon).toHaveClass('js-icon');
});

test('shows a link to the code editor page', async () => {
  const { repository } = renderComponent();

  await screen.findByRole('img', {
    name: 'Javascript',
  });

  const link = await screen.findByRole('link', {
    name: new RegExp(repository.owner.login),
  });

  expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`);
});

const pause = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
};
