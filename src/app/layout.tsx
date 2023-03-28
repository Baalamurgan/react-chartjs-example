"use client";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  rem,
  ChevronIcon,
} from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconHome,
  IconHome2,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  TablerIconsProps,
  IconChartInfographic,
  IconTrendingUp,
  IconReportAnalytics,
  IconStack2,
  IconSettings,
  IconSettings2,
  IconMenu2,
} from "@tabler/icons-react";
import Image from "next/image";
import {
  ChevronRightIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Collapsible } from "@/component/Collapsible";
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

  const [navbarOpen, setNavbarOpen] = useState(true);
  return (
    <html lang="en">
      <body>
        {!navbarOpen && (
          <IconMenu2
            className="h-10 w-10 cursor-pointer"
            onClick={() => setNavbarOpen((p) => !p)}
          />
        )}
        <Navbar
          p="md"
          className={`bg-black pb-0 px-0 absolute left-0 top-0 transition-all duration-300 ease-in-out
          ${navbarOpen ? "!w-64" : "!w-0"}
          `}
        >
          <Navbar.Section
            className={`p-5 pt-0 text-black ${
              navbarOpen ? "border-b border-b-gray-600 block" : "hidden"
            }`}
          >
            <Group position="apart">
              <div className="flex items-center">
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

          {/* <Navbar.Section className={classes.footer}>
            <UserButton
              image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
              name="Ann Nullpointer"
              email="anullpointer@yahoo.com"
            />
          </Navbar.Section> */}
        </Navbar>
        {toast && <toast.ToastContainer />}
        {children}
      </body>
    </html>
  );
}

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
