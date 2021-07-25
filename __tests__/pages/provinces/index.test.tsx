import React from "react";

import { provinceListItemBuilder } from "~/components/__mocks__/builders/province-list";
import { dateMockBuilder } from "~/lib/__mocks__/builders/date-mock";
import ProvincesPage from "~/pages/provinces";

import { render, screen, within } from "@testing-library/react";

describe("ProvincesPage", () => {
  const provinceListItem = provinceListItemBuilder();
  const provinceList = [provinceListItem];

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("renders the title and the breadcrumbs correctly", () => {
    render(<ProvincesPage provincesList={provinceList} />);

    const [breadcrumbs, title] = screen.getAllByText("Provinsi");

    expect(breadcrumbs).toBeVisible();
    expect(breadcrumbs).toHaveAttribute("href", "/provinces");
    expect(title).toBeVisible();
  });

  it("renders the provinces list correctly", () => {
    render(<ProvincesPage provincesList={provinceList} />);

    expect(screen.getByText(provinceListItem.initials)).toBeVisible();

    const provinceLink = screen.getByRole("link", {
      name: /informasi faskes & alkes untuk covid-19 di provinsi/i,
    });
    expect(provinceLink).toHaveAttribute(
      "href",
      `/provinces/${provinceListItem.slug}`,
    );

    expect(within(provinceLink).getByText(provinceListItem.name)).toBeVisible();
    expect(
      within(provinceLink).getByText(`${provinceListItem.count} Entri`),
    ).toBeVisible();
  });

  it("renders the SEO text correctly", () => {
    const { date, dateStr } = dateMockBuilder();

    jest.setSystemTime(date);

    render(<ProvincesPage provincesList={provinceList} />);

    const seoText = screen.getByText(dateStr as string, { exact: false });
    expect(seoText).toBeVisible();
    expect(seoText).toHaveTextContent(
      `Cari & Temukan Informasi Fasilitas Kesehatan (Faskes) & Alat Kesehatan (Alkes) untuk COVID-19 di seluruh Indonesia per ${dateStr}`,
    );
  });
});
