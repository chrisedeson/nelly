import PortfolioPage from '@/components/PortfolioPage';
import { getPortfolioData } from '@/lib/data';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const data = await getPortfolioData();

  return <PortfolioPage data={data} />;
}
