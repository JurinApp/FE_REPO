import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

interface IStockHistory {
	readonly tradeDate: string;
	readonly price: number;
	readonly volume: number;
	readonly transactionAmount: number;
}

const DAY: { [key: number]: string } = {
	0: "일",
	1: "월",
	2: "화",
	3: "수",
	4: "목",
	5: "금",
	6: "토",
};

interface ITick {
	readonly value: number;
	readonly label: string;
}

const StockPriceChart = ({
	stockPriceHistory,
}: {
	stockPriceHistory: IStockHistory[];
}) => {
	const labels = useMemo(() => {
		const newLabels = stockPriceHistory.map((data) => {
			const date = new Date(data.tradeDate);
			const replaceDate = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
			const day = date.getDay();
			let color = "black"; // 기본 색상은 검정색으로 설정

			if (day === 6) {
				color = "blue"; // "토"인 경우 파란색으로 설정
			} else if (day === 0) {
				color = "red"; // "일"인 경우 빨간색으로 설정
			}

			return {
				value: [`${replaceDate}`],
				text: DAY[day],
				color: color,
			};
		});

		return newLabels;
	}, [stockPriceHistory]);

	const chartData = useMemo(() => {
		return {
			labels: labels.map((label) => `${label.value} ${label.text}`),
			datasets: [
				{
					label: "주식 가격",
					data: stockPriceHistory.map((data) => data.price),
					backgroundColor: "rgba(207, 208, 247, 1.00)",
					borderColor: "rgba(61, 52, 139, 1)",
					borderWidth: 2,
					tension: 0.1,
					pointRadius: 3,
				},
			],
		};
	}, [labels]);

	const options = useMemo(() => {
		return {
			scales: {
				x: { beginAtZero: true },
				y: {
					beginAtZero: true,
					afterTickToLabelConversion: (scaleInstance: any) => {
						const ticks = scaleInstance.ticks;
						const newTicks = ticks.map((tick: ITick, index: number) => {
							if (index === 0) {
								return {
									...tick,
									label: "최소값",
								};
							}

							if (index === ticks.length - 1) {
								return {
									...tick,
									label: "최대값",
								};
							}

							return {
								...tick,
								label: "",
							};
						});

						scaleInstance.ticks = newTicks;
					},
				},
			},
			tooltip: {
				backgroundColor: "rgba(0, 0, 0, 0.7)",
				padding: 10,
			},
			responsive: true,
			plugins: {
				legend: {
					labels: {
						usePointStyle: true,
						padding: 10,
					},
				},
				tooltip: {
					backgroundColor: "rgba(0, 0, 0, 0.7)",
					padding: 10,
					bodySpacing: 5,
				},
			},
		};
	}, []);

	return (
		<section id="stock-chart" className="mx-4 mt-6">
			<div className="flex min-h-[15rem] w-full items-center justify-center rounded border border-black-100 bg-white">
				{stockPriceHistory.length === 0 ? (
					<p className="text-sm text-black-800">주식 거래 정보가 없습니다.</p>
				) : (
					<Line data={chartData} options={options} />
				)}
			</div>
		</section>
	);
};

export default StockPriceChart;
