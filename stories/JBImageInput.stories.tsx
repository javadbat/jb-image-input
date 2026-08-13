import { useRef } from 'react';
import type { JBImageInputWebComponent } from 'jb-image-input';
import { JBButton } from 'jb-button/react';
import { JBImageInput } from 'jb-image-input/react';
import JBImageInputActionTest from './JBImageInputActionTest.jsx';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor } from 'storybook/test';

const meta = {
  title: "Components/form elements/JBImageInput",
  component: JBImageInput,
} satisfies Meta<typeof JBImageInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    acceptTypes: "image/jpeg,image/jpg,image/png,image/svg+xml",
    message: "extra message"
  }
};

const bridgePreview = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Q5NzcyMiIvPjwvc3ZnPg==';

export const BridgeAndValue: Story = {
  render: () => (
    <JBImageInput<string>
      label="Profile image"
      message="Upload a profile image"
      value="profile-42"
      config={{ uploadUrl: '/api/images' }}
      bridge={{
        uploader: async file => `uploaded:${file.name}`,
        downloader: async () => bridgePreview,
      }}
    />
  ),
  play: async ({ canvasElement }) => {
    const imageInput = canvasElement.querySelector<JBImageInputWebComponent<string>>('jb-image-input');
    expect(imageInput).toBeTruthy();

    await waitFor(() => {
      expect(imageInput?.value).toBe('profile-42');
      expect(imageInput?.status).toBe('downloaded');
      expect(imageInput?.imageBase64Value).toBe(bridgePreview);
    });

    await imageInput!.selectImageByFile(createSvgFile('uploaded.svg', 'green'));

    await waitFor(() => {
      expect(imageInput?.value).toBe('uploaded:uploaded.svg');
      expect(imageInput?.file?.name).toBe('uploaded.svg');
      expect(imageInput?.status).toBe('downloaded');
    });
  },
};

export const MaxFileSize: Story = {
  render: () => <JBImageInput label="Small image only" maxFileSize={8} />,
  play: async ({ canvasElement }) => {
    const imageInput = canvasElement.querySelector<JBImageInputWebComponent>('jb-image-input');
    const onMaxSizeExceed = fn();
    imageInput?.addEventListener('maxSizeExceed', onMaxSizeExceed);

    await imageInput?.selectImageByFile(new File(['this file is too large'], 'large.svg', { type: 'image/svg+xml' }));

    expect(onMaxSizeExceed).toHaveBeenCalledOnce();
    expect(imageInput?.file).toBeNull();
    expect(imageInput?.value).toBeNull();
  },
};

export const MultipleSelection: Story = {
  render: () => <JBImageInput label="Gallery images" multiple acceptTypes="image/png,image/jpeg" />,
  play: async ({ canvasElement }) => {
    const imageInput = canvasElement.querySelector<JBImageInputWebComponent>('jb-image-input');

    expect(imageInput?.multiple).toBe(true);
    expect(imageInput?.acceptTypes).toBe('image/png,image/jpeg');
  },
};

const createSvgFile = (name: string, color: string) => new File(
  [`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="${color}"/></svg>`],
  name,
  { type: 'image/svg+xml' },
);
const initialImage = createSvgFile('initial.svg', 'blue');
const liveImage = createSvgFile('live.svg', 'red');

export const InitialValue: Story = {
  render: (args) => {
    const formRef = useRef<HTMLFormElement>(null);
    return (
      <form ref={formRef}>
        <JBImageInput<File> label={args.label} initialValue={args.initialValue as File | null | undefined} />
        <JBButton type="button" onClick={() => formRef.current?.reset()}>Reset</JBButton>
      </form>
    );
  },
  args: {
    label: 'initial image',
    initialValue: initialImage,
  },
  play: async ({ canvasElement }) => {
    const imageInput = canvasElement.querySelector<JBImageInputWebComponent<File>>('jb-image-input');
    const resetButton = canvasElement.querySelector('jb-button')?.shadowRoot?.querySelector<HTMLButtonElement>('button');

    expect(imageInput).toBeTruthy();
    expect(resetButton).toBeTruthy();

    await waitFor(() => {
      expect(imageInput?.initialValue?.name).toBe('initial.svg');
      expect(imageInput?.value).toBe(imageInput?.initialValue);
      expect(imageInput?.isDirty).toBe(false);
    });

    imageInput!.value = createSvgFile('live.svg', 'red');

    await waitFor(() => {
      expect(imageInput?.value?.name).toBe('live.svg');
      expect(imageInput?.isDirty).toBe(true);
    });

    imageInput!.initialValue = createSvgFile('next.svg', 'green');

    expect(imageInput?.initialValue?.name).toBe('next.svg');
    expect(imageInput?.value?.name).toBe('live.svg');
    expect(imageInput?.isDirty).toBe(true);

    await userEvent.click(resetButton!);

    await waitFor(() => {
      expect(imageInput?.value).toBe(imageInput?.initialValue);
      expect(imageInput?.value?.name).toBe('next.svg');
      expect(imageInput?.isDirty).toBe(false);
    });

    const cleanInitialImage = createSvgFile('clean.svg', 'purple');
    imageInput!.initialValue = cleanInitialImage;

    await waitFor(() => {
      expect(imageInput?.value).toBe(cleanInitialImage);
      expect(imageInput?.isDirty).toBe(false);
    });
  },
};

export const InitialValueDoesNotOverrideValue: Story = {
  args: {
    initialValue: initialImage,
    value: liveImage,
  },
  play: async ({ canvasElement }) => {
    const imageInput = canvasElement.querySelector<JBImageInputWebComponent<File>>('jb-image-input');

    await waitFor(() => {
      expect(imageInput?.initialValue?.name).toBe('initial.svg');
      expect(imageInput?.value?.name).toBe('live.svg');
      expect(imageInput?.isDirty).toBe(true);
    });
  },
};

export const ExplicitNullValueDoesNotFallBackToInitialValue: Story = {
  args: {
    initialValue: initialImage,
    value: null,
  },
  play: async ({ canvasElement }) => {
    const imageInput = canvasElement.querySelector<JBImageInputWebComponent<File>>('jb-image-input');

    await waitFor(() => {
      expect(imageInput?.initialValue?.name).toBe('initial.svg');
      expect(imageInput?.value).toBeNull();
      expect(imageInput?.isDirty).toBe(true);
    });
  },
};

export const Required: Story = {
  args: {
    message: "extra message",
    required: true,
  }
};
export const RequiredWithMessage: Story = {
  args: {
    message: "extra message",
    required: "you must fill this field to continue",
  }
};

export const ActionTest: Story = {
  render: (args) => <JBImageInputActionTest {...args}></JBImageInputActionTest>
};

export const WithPlaceHolder: Story = {
  render: (args) => (
    <JBImageInput {...args}>
      <div slot="placeholder" style={{ width: '100%', height: '100%' }}>
        <div style={{ width: '100%', height: '100%', background: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>custom placeholder</div>
      </div>
    </JBImageInput>
  )
};
