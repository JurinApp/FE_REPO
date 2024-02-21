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
import { Line } from "react-chartjs-2";

interface IStockPriceChartProps {
	tradeDate: string;
	price: number;
	volume: number;
	transactionAmount: number;
}

interface IStockPriceArray extends Array<IStockPriceChartProps> {}

const StockPriceChart = ({ dailyPrice }: { dailyPrice: IStockPriceArray }) => {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend,
	);

	// const labels = stockData.map((data) => [`${data.date}`, `${data.day}`]);

	const labels = dailyPrice.map((data) => {
		const day = data.tradeDate;
		let color = "black"; // 기본 색상은 검정색으로 설정

		if (day === "토") {
			color = "blue"; // "토"인 경우 파란색으로 설정
		} else if (day === "일") {
			color = "red"; // "일"인 경우 빨간색으로 설정
		}

		return {
			value: [`${data.tradeDate}`],
			text: day,
			color: color,
		};
	});
	const prices = dailyPrice.map((data) => data.price);

	const data = {
		labels: labels.map((label) => label.value),
		datasets: [
			{
				label: "Stock Prices",
				data: prices,
				backgroundColor: "rgba(207, 208, 247, 1.00)",
				borderColor: "rgba(61, 52, 139, 1)",
				borderWidth: 2,
				tension: 0.1,
				pointRadius: 3,
			},
		],
	};
	const options = {
		scales: {
			x: { beginAtZero: true },
			y: {
				beginAtZero: true,
				ticks: {
					callback: function (index: number, values: any) {
						if (index === 0) {
							return "최소값";
						} else if (index === values.length - 1) {
							return "최대값";
						}
					},
				},
			},
		},
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
				text: "Chart.js Line Chart",
			},
		},
	};
	return (
		<div className="h-[22.563rem] w-full bg-white">
			<p>주식 거래 정보가 없습니다.</p>
			{dailyPrice !== undefined && <Line data={data} options={options} />}
		</div>
	);
};

export default StockPriceChart;
