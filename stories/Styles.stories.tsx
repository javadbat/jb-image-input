import React, { useMemo } from 'react';
import { JBImageInput } from 'jb-image-input/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '../../../docs/styles/ant-design.css';
import '../../../docs/styles/aurora.css';
import '../../../docs/styles/bootstrap.css';
import '../../../docs/styles/candy.css';
import '../../../docs/styles/carbon.css';
import '../../../docs/styles/cupertino.css';
import '../../../docs/styles/fluent.css';
import '../../../docs/styles/forest.css';
import '../../../docs/styles/material.css';
import '../../../docs/styles/porcelain.css';
import '../../../docs/styles/sunset.css';
import '../../../docs/styles/terminal.css';
import './styles/style-ant-design.css';
import './styles/style-aurora.css';
import './styles/style-bootstrap.css';
import './styles/style-candy.css';
import './styles/style-carbon.css';
import './styles/style-cupertino.css';
import './styles/style-fluent.css';
import './styles/style-forest.css';
import './styles/style-material.css';
import './styles/style-porcelain.css';
import './styles/style-sunset.css';
import './styles/style-terminal.css';

const meta = {
  title: "Components/form elements/JBImageInput/Style",
  component: JBImageInput,
} satisfies Meta<typeof JBImageInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const styleSamples = [
  { name: "Carbon", className: "carbon-style carbon-image-input" },
  { name: "Aurora", className: "aurora-style aurora-image-input" },
  { name: "Forest", className: "forest-style forest-image-input" },
  { name: "Sunset", className: "sunset-style sunset-image-input" },
  { name: "Porcelain", className: "porcelain-style porcelain-image-input" },
  { name: "Candy", className: "candy-style candy-image-input" },
  { name: "Terminal", className: "terminal-style terminal-image-input" },
  { name: "Material", className: "material-style material-image-input" },
  { name: "Fluent", className: "fluent-style fluent-image-input" },
  { name: "Bootstrap", className: "bootstrap-style bootstrap-image-input" },
  { name: "Cupertino", className: "cupertino-style cupertino-image-input" },
  { name: "Ant Design", className: "ant-design-style ant-image-input" },
];

function createPreviewFile(name: string, accent: string, background: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220">
    <rect width="320" height="220" fill="${background}"/>
    <circle cx="84" cy="70" r="34" fill="${accent}" opacity="0.9"/>
    <path d="M0 180 L86 104 L144 154 L204 88 L320 188 L320 220 L0 220 Z" fill="${accent}" opacity="0.72"/>
    <path d="M170 124 L220 82 L320 170 L320 220 L130 220 Z" fill="#ffffff" opacity="0.34"/>
  </svg>`;
  return new File([svg], name, { type: "image/svg+xml" });
}

function ImageInputStyleSample({ className }: { className: string }) {
  const file = useMemo(() => createPreviewFile("gallery-preview.svg", "#ffffff", "#2563eb"), []);

  return (
    <div style={{
      display: "grid",
      gap: "0.75rem",
      width: "100%",
    }}>
      <JBImageInput className={className} label="Select image" message="PNG, JPG, or SVG" />
      <JBImageInput className={className} label="Selected image" file={file} />
      <JBImageInput className={className} label="Disabled image" message="Read only" disabled />
    </div>
  );
}

export const Gallery: Story = {
  name: "Gallery",
  render: () => (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
      gap: "1.25rem",
      alignItems: "start",
      width: "min(100%, 76rem)",
    }}>
      {styleSamples.map((sample) => (
        <section
          key={sample.className}
          style={{
            display: "grid",
            gap: "0.75rem",
            minWidth: 0,
            padding: "1rem",
            background: "var(--jb-surface, #ffffff)",
            border: "1px solid var(--jb-border-color, #e5e7eb)",
            borderRadius: "0.75rem",
            boxShadow: "0 0.75rem 1.75rem oklch(0% 0 0 / 0.08)",
          }}
          className={sample.className.split(" ")[0]}
        >
          <div style={{
            width: "100%",
            color: "var(--jb-text-primary, #334155)",
            fontSize: "0.875rem",
            fontWeight: 700,
            lineHeight: 1.4,
            textAlign: "center",
          }}>
            {sample.name}
          </div>
          <ImageInputStyleSample className={sample.className} />
        </section>
      ))}
    </div>
  ),
};

export const Default: Story = {
  name: "Default",
  render: () => <ImageInputStyleSample className="" />,
};

export const Carbon: Story = {
  name: "Carbon",
  render: () => <ImageInputStyleSample className="carbon-style carbon-image-input" />,
};

export const Aurora: Story = {
  name: "Aurora",
  render: () => <ImageInputStyleSample className="aurora-style aurora-image-input" />,
};

export const Forest: Story = {
  name: "Forest",
  render: () => <ImageInputStyleSample className="forest-style forest-image-input" />,
};

export const Sunset: Story = {
  name: "Sunset",
  render: () => <ImageInputStyleSample className="sunset-style sunset-image-input" />,
};

export const Porcelain: Story = {
  name: "Porcelain",
  render: () => <ImageInputStyleSample className="porcelain-style porcelain-image-input" />,
};

export const Candy: Story = {
  name: "Candy",
  render: () => <ImageInputStyleSample className="candy-style candy-image-input" />,
};

export const Terminal: Story = {
  name: "Terminal",
  render: () => <ImageInputStyleSample className="terminal-style terminal-image-input" />,
};

export const Material: Story = {
  name: "Material",
  render: () => <ImageInputStyleSample className="material-style material-image-input" />,
};

export const Fluent: Story = {
  name: "Fluent",
  render: () => <ImageInputStyleSample className="fluent-style fluent-image-input" />,
};

export const Bootstrap: Story = {
  name: "Bootstrap",
  render: () => <ImageInputStyleSample className="bootstrap-style bootstrap-image-input" />,
};

export const Cupertino: Story = {
  name: "Cupertino",
  render: () => <ImageInputStyleSample className="cupertino-style cupertino-image-input" />,
};

export const AntDesign: Story = {
  name: "Ant Design",
  render: () => <ImageInputStyleSample className="ant-design-style ant-image-input" />,
};
