
import CorrelationItem from "./CorrelationItem";
import ItemsList from "../../ItemsList";

const Correlations = ({
  correlations,
  focusNode,
  title
}: {
  correlations: Map<string, number>;
  focusNode: (id: string) => void;
  title: string;
}) => {
  return (
    <ItemsList itemsCount={correlations.size} title={title}>
      <>
        {Array.from(correlations)
          .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
          .map(([ticker, percentage]) => (
            <CorrelationItem
              key={ticker}
              correlations={{ ticker, percentage: parseFloat((percentage * 100).toFixed(2)) }}
              focusDependency={focusNode}
            />
          ))}</>
    </ItemsList>
  )
};

export default Correlations;