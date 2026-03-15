
import CorrelationItem from "./CorrelationItem";
import ItemsList from "../../ItemsList";

const Correlations = ({
  correlations,
  focusNode,
}: {
  correlations: Map<string, number>;
  focusNode: (id: string) => void;
}) => {
  return (
    <ItemsList itemsCount={correlations.size} title="Correlations">
      <>
        {Array.from(correlations)
          .sort((a, b) => b[1] - a[1])
          .map(([ticker, percentage]) => (
            <CorrelationItem
              key={ticker}
              correlations={{ ticker, percentage }}
              focusDependency={focusNode}
            />
          ))}</>
    </ItemsList>
  )
};

export default Correlations;