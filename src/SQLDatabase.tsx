import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import initSqlJs from "sql.js";
interface SQLDatabaseState {
	db: initSqlJs.Database | null;
}

const initialState: SQLDatabaseState = {
	db: null,
};

const SQLDatabaseContext = createContext(initialState);

export const SQLDatabaseProvider: React.FunctionComponent<
	PropsWithChildren<{}>
> = ({ children }) => {
	const [db, setDb] = useState<initSqlJs.Database | null>(null);
	const [,setError] = useState<any | null>(null);
	const fetchSqlJs = async () => {
		try {
			const database = await fetch("/practice.sqlite");
			const dataBuffer = await database.arrayBuffer();
			const SQL = await initSqlJs({
				locateFile: (url) => {
					return `/${url}`;
				},
			});
			const dbSql = new SQL.Database(Buffer.from(dataBuffer));
			setDb(dbSql);
		} catch (err) {
			setError(err);
		}
	};

	useEffect(() => {
		fetchSqlJs();
	}, []);

	return (
		<SQLDatabaseContext.Provider value={{ db }}>
			{/* {
      	if (error) return <pre>{error.toString()}</pre>;
        else if (!db) return <pre>Loading...</pre>;
        else
    } */}
			{children}
		</SQLDatabaseContext.Provider>
	);
};

export const useDatabase = () => {
	const { db } = useContext(SQLDatabaseContext);
	if (!db) throw new Error("Database hasn't been initialized");
	return db;
};
