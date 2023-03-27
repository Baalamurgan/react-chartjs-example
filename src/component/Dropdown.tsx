import { useClickAway } from '@/utils/useClickAway';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useMemo,
  useRef,
  useState,
} from 'react';

interface Props<Item>
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'onChange'
  > {
  options: Item[];
  identifier: keyof Item | ((item: Item) => string);
  selected: string | number;
  Render: FC<{ item: Item }>;
  onChange: (p: { item: Item }) => void;
  label?: string;
  innerClassname?: string;
}

export const Dropdown = <Item,>({
  options,
  identifier,
  selected,
  Render,
  onChange,
  className,
  innerClassname,
  label,
  ...props
}: Props<Item>) => {
  const current = useMemo(
    () =>
      options.find(item =>
        typeof identifier === 'function'
          ? identifier(item) === selected
          : (item?.[identifier] as unknown as string) === selected
      ),
    [options, identifier, selected]
  );
  const [dropOpen, setDropOpen] = useState(false);
  const dropDownRef = useRef(null);
  useClickAway(dropDownRef, () => {
    setDropOpen(false);
  });

  return (
    <div
      {...props}
      className={['relative', className].join(' ')}
      ref={dropDownRef}
    >
      {label && (
        <div>
          <p className="font-bold">{label}</p>
        </div>
      )}
      <div
        onClick={() => setDropOpen(p => !p)}
        className={`flex items-center cursor-pointer border-2 rounded-[4px] hover:shadow px-1 ${
          innerClassname ?? ''
        }`}
      >
        <div className="flex-1">
          {current ? (
            <Render item={current} />
          ) : (
            <p className="text-sm text-gray-500">Segfsgflect</p>
          )}
        </div>
        <div className="self-stretch border-r my-3" />
        <ChevronDownIcon
          className={[
            'h-4 w-4 transition-all text-gray-400',
            dropOpen ? 'rotate-180' : '',
          ].join(' ')}
        />
      </div>
      {dropOpen && (
        <div className="shadow -m-1 p-1 max-h-[250px] overflow-y-auto absolute top-full my-1 right-0 bg-white z-10 left-0 rounded-md">
          {options.map(item => {
            const key =
              typeof identifier === 'function'
                ? identifier(item)
                : (item[identifier] as unknown as string);
            return (
              <div
                onClick={() => {
                  onChange({ item });
                  setDropOpen(false);
                }}
                className="m-1 cursor-pointer hover:bg-gray-100 rounded"
                key={key}
              >
                <Render item={item} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
