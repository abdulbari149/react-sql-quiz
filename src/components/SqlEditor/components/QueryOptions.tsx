import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { KeywordsPanel } from "./KeywordsPanel";
import { TablePanel } from "./TablePanel";

interface Props {}

export const QueryOptions: React.FunctionComponent<Props> = () => {
	const [tabIndex, setTabIndex] = useState(0);

	const styles: React.CSSProperties = {
		color: "white",
		border: "2px solid #e2e2e2",
		padding: "10px 35px",
		margin: "0 5px",
		background: "#44637f",
		borderRadius: "5px 5px 0 0",
	};

	const tabPanelStyle: React.CSSProperties = {
		border: "2px solid #e2e2e2",
		borderTop: "none",
		marginTop: "0",
		top: -10,
		borderRadius: "2px",
		position: "relative",
	};

	return (
		<Tabs style={{ height: "100%" }}>
			<TabList>
				<Tab tabIndex="table" style={styles}>
					Table
				</Tab>

				<Tab tabIndex="keywords" style={styles}>
					Keywords
				</Tab>
			</TabList>
			<TabPanel style={tabPanelStyle}>
				<TablePanel />
			</TabPanel>
			<TabPanel style={tabPanelStyle}>
				<KeywordsPanel />
			</TabPanel>
		</Tabs>
	);
};
