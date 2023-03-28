"use client";
import { Collapsible } from "@/component/Collapsible";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Center,
  ChevronIcon,
  Code,
  Group,
  Navbar,
  ScrollArea,
  Stack,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import {
  IconCalendarStats,
  IconChartInfographic,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome,
  IconHome2,
  IconLogout,
  IconReportAnalytics,
  IconSettings,
  IconStack2,
  IconSwitchHorizontal,
  IconTrendingUp,
  IconUser,
  TablerIconsProps,
} from "@tabler/icons-react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
// import { UserButton } from '../UserButton/UserButton';
// import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
// import { Logo } from './Logo';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toast, setToast] = useState<typeof import("react-toastify") | null>(
    null
  );
  useEffect(() => {
    import("react-toastify").then((module) => {
      setToast(module);
    });
  }, []);

  const mockdata = [
    { label: "Dashboard", icon: IconHome },
    {
      label: "Graphs",
      icon: IconChartInfographic,
      initiallyOpened: false,
      links: [
        { label: "15 min report", link: "/report?report_type=15min" },
        { label: "60 min report", link: "/report?report_type=60min" },
        { label: "24 hours report", link: "/report?report_type=24hours" },
        { label: "Shift report", link: "/report?report_type=shift" },
        { label: "30 days report", link: "/report?report_type=30days" },
        {
          label: "Historical tendency",
          link: "/report?report_type=historical",
        },
        { label: "Meters raw data", link: "/report?report_type=meters" },
      ],
    },
    {
      label: "Trends",
      icon: IconTrendingUp,
      initiallyOpened: false,
      links: [
        { label: "Live trends", link: "/trend?trend_type=live" },
        { label: "Parameter view", link: "/trend?trend_type=parameter" },
        { label: "Meters status", link: "/trend?trend_type=meter" },
        { label: "Instruments status", link: "/trend?trend_type=instrument" },
      ],
    },
    {
      label: "Report",
      icon: IconReportAnalytics,
      initiallyOpened: false,
      links: [
        { label: "Consumption report", link: "/trend?trend_type=live" },
        { label: "Daily excel report", link: "/trend?trend_type=parameter" },
        {
          label: "Shiftwise excel report",
          link: "/trend?trend_type=parameter",
        },
        { label: "Live comparison", link: "/trend?trend_type=parameter" },
        { label: "Energy variation report", link: "/trend?trend_type=meter" },
        {
          label: "Group wise meter consumption",
          link: "/trend?trend_type=instrument",
        },
      ],
    },
    {
      label: "Group",
      icon: IconStack2,
      initiallyOpened: false,
      links: [
        { label: "Groups", link: "/group?group_type=all" },
        { label: "Group config", link: "/group?group_type=config" },
        { label: "Group report", link: "/group?group_type=report" },
      ],
    },
    {
      label: "Config",
      icon: IconSettings,
      initiallyOpened: false,
      links: [
        { label: "Converter config", link: "/config?config_type=converter" },
        { label: "Meter config", link: "/config?config_type=meter" },
        {
          label: "Auto report config",
          link: "/config?config_type=auto_report",
        },
      ],
    },
  ];

  const [navbarOpen, setNavbarOpen] = useState(false);
  const collapsedMockData = [
    { icon: IconHome2, label: "Home" },
    { icon: IconGauge, label: "Dashboard" },
    { icon: IconDeviceDesktopAnalytics, label: "Analytics" },
    { icon: IconCalendarStats, label: "Releases" },
    { icon: IconUser, label: "Account" },
    { icon: IconFingerprint, label: "Security" },
    { icon: IconSettings, label: "Settings" },
  ];
  const [active, setActive] = useState(2);
  const links = collapsedMockData.map((link, index) => (
    <CollpasedNavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));
  return (
    <html lang="en">
      <body>
        {!navbarOpen && (
          <Navbar
            height={"100vh"}
            width={{ base: 70 }}
            p="md"
            className="fixed top-0 left-[-1px] z-50"
            sx={(theme) => ({
              backgroundColor: theme.fn.variant({
                variant: "filled",
                color: theme.primaryColor,
              }).background,
            })}
          >
            <Center>
              <Image
                onClick={() => setNavbarOpen((p) => !p)}
                className="cursor-pointer"
                unoptimized
                priority
                src="/logo.png"
                alt="logo"
                width={20}
                height={20}
              />
            </Center>
            <Navbar.Section grow mt={50}>
              <Stack justify="center" spacing={0}>
                {links}
              </Stack>
            </Navbar.Section>
            <Navbar.Section>
              <Stack justify="center" spacing={0}>
                <CollpasedNavbarLink
                  icon={IconSwitchHorizontal}
                  label="Change account"
                />
                <CollpasedNavbarLink icon={IconLogout} label="Logout" />
              </Stack>
            </Navbar.Section>
          </Navbar>
        )}
        <Navbar
          height={"100vh"}
          p="md"
          className={`bg-black pb-0 px-0 fixed top-0 -left-1 z-50 transition-all duration-300 ease-in-out
          ${navbarOpen ? "!w-80" : "!w-0"}
          `}
        >
          <Navbar.Section
            className={`p-5 pt-0 text-black ${
              navbarOpen ? "border-b border-b-gray-600 block" : "hidden"
            }`}
          >
            <Group position="apart">
              <div className="flex items-center justify-between w-full">
                <Image
                  unoptimized
                  priority
                  src="/logo.png"
                  alt="logo"
                  width={200}
                  height={100}
                />
                <XMarkIcon
                  className="h-10 w-10 text-white cursor-pointer"
                  onClick={() => setNavbarOpen((p) => !p)}
                />
              </div>
              <Code sx={{ fontWeight: 700 }}>v0.0.1</Code>
            </Group>
          </Navbar.Section>

          <Navbar.Section grow className="w-full" component={ScrollArea}>
            <div className="py-5">
              {mockdata.map((link, index) => (
                <NavbarLink index={index} link={link} />
              ))}
            </div>
          </Navbar.Section>
        </Navbar>
        {toast && <toast.ToastContainer />}
        {children}
      </body>
    </html>
  );
}

interface NavbarLinkProps {
  icon: FC<any>;
  label: string;
  active?: boolean;
  onClick?(): void;
}

const CollpasedNavbarLink = ({
  icon: Icon,
  label,
  active,
  onClick,
}: NavbarLinkProps) => {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className="my-2">
        <Icon size="1.8rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
};

const NavbarLink = ({
  index,
  link,
}: {
  index: number;
  link:
    | {
        label: string;
        icon: (props: TablerIconsProps) => JSX.Element;
        initiallyOpened?: undefined;
        links?: undefined;
      }
    | {
        label: string;
        icon: (props: TablerIconsProps) => JSX.Element;
        links: { label: string; link: string }[];
        initiallyOpened?: boolean | undefined;
      };
}) => {
  const [opened, setOpened] = useState(link.initiallyOpened || false);
  return (
    <div key={index}>
      <div
        className="group flex items-center justify-between text-white hover:bg-gray-200 hover:text-black py-4 hover:cursor-pointer"
        onClick={() => {
          setOpened((opened) => !opened);
        }}
      >
        <div className="flex items-center pl-5">
          <link.icon size={20} className="text-white group-hover:text-black" />
          <span className="ml-3">{link.label}</span>
        </div>
        {Array.isArray(link.links) && (
          <ChevronIcon
            className={`transition-transform duration-200 ease-in-out h-5 w-5 text-white group-hover:text-black mr-5 ${
              opened ? "" : "-rotate-90"
            }`}
            stroke={"1.5"}
          />
        )}
      </div>
      <Collapsible collapsed={!opened}>
        {link.links && (
          <div className="ml-7 border-l border-l-gray-400">
            {link.links.map((link, index) => (
              <div
                key={index}
                className="flex items-center my-2 hover:bg-gray-700 w-full cursor-pointer py-2 pl-5 text-gray-400 hover:text-white"
              >
                <span>{link.label}</span>
              </div>
            ))}
          </div>
        )}
      </Collapsible>
    </div>
  );
};
