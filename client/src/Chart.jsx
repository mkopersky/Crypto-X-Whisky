import { createChart, CrosshairMode, LineStyle } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const Chart = ({ data }) => {
    const chartContainerRef = useRef();
    const chartRef = useRef();

    useEffect(() => {

        console.log('Chart container:', chartContainerRef.current);
        console.log('Width:', chartContainerRef.current.clientWidth);
        console.log('Height:', chartContainerRef.current.clientHeight);

        const myPriceFormatter = Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 5
        }).format;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { color: '#151B21' },
                textColor: '#DDD',
            },
            grid: {
                vertLines: { color: '#202F33' },
                horzLines: { color: '#202F33' },
            },
            timeScale: {
                timeVisible: true, 
                secondsVisible: false,
            },
            crosshair: {
                mode: CrosshairMode.Normal,
                vertLine: {
                    width: 8,
                    color: '#C3BCDB44',
                    style: LineStyle.Solid,
                    labelBackgroundColor: '#9B7DFF',
                },
                horzLine: {
                    color: '#9B7DFF',
                    labelBackgroundColor: '#9B7DFF',
                },
            },
            localization: {
                priceFormatter: myPriceFormatter,
            },
            width: chartContainerRef.current.clientWidth,
            height: 300,
        });
        chartRef.current = chart;

        const candlestickSeries = chart.addCandlestickSeries({
            priceFormat: {
                type: 'custom',
                formatter: myPriceFormatter,
                minMove: 0.00001, 
                precision: 5,   // Wyświetlanie 5 miejsc po przecinku
            },
            priceLineVisible: true,
        });

        candlestickSeries.applyOptions({
            wickUpColor: 'rgb(54, 116, 217)',
            upColor: 'rgb(54, 116, 217)',
            wickDownColor: 'rgb(225, 50, 85)',
            downColor: 'rgb(225, 50, 85)',
            borderVisible: false
        });

        candlestickSeries.setData(data);

        chart.timeScale().fitContent();

        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(chartContainerRef.current);

        return () => {
            resizeObserver.disconnect();
            chart.remove();
        };
    }, [data]);

    return <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />;
};