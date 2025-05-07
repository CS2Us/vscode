/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// 区县信息
export interface AmapDistrict {
	name: string;     // 区县名称
	adcode: string;   // 区县编码
	polyline: string; // 区县边界坐标串
}

// 城市信息
export interface AmapCity {
	adcode: string;    // 区域编码
	citycode: string;  // 城市编码
	city: string;      // 城市名称
	district: AmapDistrict;
}

// 导航信息
export interface AmapNavigation {
	action: string;           // 导航动作
	assistant_action: string; // 辅助导航动作
	cities: AmapCity;
}

// 路况信息
export interface AmapTrafficInfo {
	tmc_status: string;    // 路况状态
	tmc_distance: string;  // 路况距离
	tmc_polyline: string;  // 路况坐标串
	navi: AmapNavigation;
}

// 费用信息
export interface AmapDrivingCost {
	duration: string;      // 时间
	tolls: string;         // 收费
	toll_distance: string;  // 收费距离
	toll_road: string;      // 收费道路
	taxi_fee: string;       // 出租车费用
	traffic_lights: string; // 红绿灯个数
	tmcs: AmapTrafficInfo[];
}

// 导航步骤
export interface AmapDrivingStep {
	instruction: string;  // 导航指示
	orientation: string;  // 方向
	road_name: string;    // 道路名称
	step_distance: string; // 步骤距离
	show_fields: string;   // 显示字段
	cost: AmapDrivingCost;
}

// 路径信息
export interface AmapDrivingPath {
	distance: string;      // 总距离
	restriction: string;   // 限行信息
	steps: AmapDrivingStep[];
}

// 高德地图驾车路线规划API响应
export interface AmapDrivingResponse {
	status: string;        // 返回状态，1：成功，0：失败
	info: string;          // 返回信息，status为0时，info返回错误原因
	infocode: string;      // 返回状态说明,10000代表正确
	count: string;         // 返回结果数目
	route: {
		origin: string;    // 起点坐标
		destination: string; // 终点坐标
		paths: AmapDrivingPath[];
	}
}
