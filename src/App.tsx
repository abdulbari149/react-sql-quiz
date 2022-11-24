import React, { useState, useEffect } from "react";
import "./styles.css";
import initSqlJs, { Database, QueryExecResult } from "sql.js";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Breif from "./components/Breif";
import Result from "./components/Result";
import SqlEditor from "./components/SqlEditor";
import "react-tabs/style/react-tabs.css";

export default function App() {
	const [db, setDb] = useState<initSqlJs.Database | null>(null);
	const [error, setError] = useState<any | null>(null);
	const [tabIndex, setTabIndex] = useState(0);
	const fetchSqlJs = async () => {
		try {
			const SQL = await initSqlJs({
				locateFile: (url) => {
					return `/${url}`;
				},
			});
			setDb(new SQL.Database());
		} catch (err) {
			setError(err);
		}
	};

	useEffect(() => {
		fetchSqlJs();
	}, []);

	const tabStyles = {
		color: "white",
		border: "2px solid #e2e2e2",
		padding: "10px 35px",
		margin: "0 5px",
		background: "#44637f",
		borderRadius: "5px 5px 0 0",
	};

	if (error) return <pre>{error.toString()}</pre>;
	else if (!db) return <pre>Loading...</pre>;
	else
		return (
			<div className="main">
				<Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
					<TabList>
						<Tab tabIndex="breif" style={tabStyles}>
							Breif
						</Tab>
						<Tab tabIndex="sql" style={tabStyles}>
							SQL
						</Tab>
						<Tab tabIndex="result" style={tabStyles}>
							Result
						</Tab>
					</TabList>
					<TabPanel>
						<Breif />
					</TabPanel>
					<TabPanel>
						<SqlEditor />
					</TabPanel>
					<TabPanel>
						<Result />
					</TabPanel>
				</Tabs>
			</div>
		);
}

interface Props {
	db: Database;
}

const SQLRepl: React.FunctionComponent<Props> = ({ db }) => {
	const [error, setError] = useState<any>(null);
	const [results, setResults] = useState<QueryExecResult[]>([]);

	function exec(sql: string) {
		try {
			// The sql is executed synchronously on the UI thread.
			// You may want to use a web worker here instead
			setResults(db.exec(sql)); // an array of objects is returned
			setError(null);
		} catch (err) {
			// exec throws an error when the SQL statement is invalid
			setError(err);
			setResults([]);
		}
	}

	return (
		<div className="App">
			<h1>React SQL interpreter</h1>

			<textarea
				onChange={(e) => exec(e.target.value)}
				placeholder="Enter some SQL. No inspiration ? Try “select sqlite_version()”"
			></textarea>

			<pre className="error">{(error || "").toString()}</pre>

			<pre>
				{
					// results contains one object per select statement in the query
					results.map(({ columns, values }, i) => (
						<ResultsTable key={i} columns={columns} values={values} />
					))
				}
			</pre>
		</div>
	);
};

interface ResultsTableProps {
	columns: any[];
	values: any[][];
}

const ResultsTable: React.FunctionComponent<ResultsTableProps> = ({
	columns,
	values,
}) => {
	return (
		<table>
			<thead>
				<tr>
					{columns.map((columnName, i) => (
						<td key={i}>{columnName}</td>
					))}
				</tr>
			</thead>

			<tbody>
				{
					// values is an array of arrays representing the results of the query
					values.map((row, i) => (
						<tr key={i}>
							{row.map((value, i) => (
								<td key={i}>{value}</td>
							))}
						</tr>
					))
				}
			</tbody>
		</table>
	);
};
