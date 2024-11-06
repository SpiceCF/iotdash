package sensor

import (
	"iotdash/backend/internal/entity"
	"iotdash/backend/internal/repositories/sqlite"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type ListSensorLogsResponse struct {
	Status int                 `json:"status" example:"200"`
	Data   []*entity.SensorLog `json:"data"`
}

func (h *RouteHandler) listSensorLogs(c echo.Context) error {
	userID, ok := c.Get("userID").(uuid.UUID)
	if !ok {
		return c.JSON(http.StatusUnauthorized, "Unauthorized")
	}

	sensorID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	sensor, err := h.sns.GetSensorByID(sensorID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	if sensor.OwnerID != userID {
		return c.JSON(http.StatusForbidden, "Forbidden")
	}

	sensorLogs, err := h.sns.ListSensorLogs(sensor.DeviceID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, ListSensorLogsResponse{
		Status: http.StatusOK,
		Data:   sensorLogs,
	})
}

type ListSensorMetricLogsResponse struct {
	Status int                               `json:"status" example:"200"`
	Data   *ListSensorMetricLogsResponseData `json:"data"`
}

type ListSensorMetricLogsResponseData struct {
	Avg []*sqlite.TimeSeries `json:"avg"`
	Max []*sqlite.TimeSeries `json:"max"`
	Min []*sqlite.TimeSeries `json:"min"`
}

type ListSensorMetricLogsRequestQuery struct {
	Key      string                   `query:"key" example:"temperature"`
	From     time.Time                `query:"from" example:"2024-11-05T00:00:00Z"`
	To       time.Time                `query:"to" example:"2024-11-05T23:59:59Z"`
	Interval sqlite.TimeSerieInterval `query:"interval" example:"day"`
}

func (h *RouteHandler) listSensorMetricLogs(c echo.Context) error {
	userID, ok := c.Get("userID").(uuid.UUID)
	if !ok {
		return c.JSON(http.StatusUnauthorized, "Unauthorized")
	}

	sensorID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	sensor, err := h.sns.GetSensorByID(sensorID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	if sensor.OwnerID != userID {
		return c.JSON(http.StatusForbidden, "Forbidden")
	}

	query := new(ListSensorMetricLogsRequestQuery)
	query.From, err = time.Parse(time.RFC3339, c.QueryParam("from"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	query.To, err = time.Parse(time.RFC3339, c.QueryParam("to"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	query.Interval = sqlite.TimeSerieInterval(c.QueryParam("interval"))
	query.Key = c.QueryParam("key")

	sensorAvgLogs, err := h.sns.GetAvgSensorLogs(
		sensor.DeviceID,
		query.Key,
		query.From,
		query.To,
		query.Interval,
	)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	sensorMaxLogs, err := h.sns.GetMaxSensorLogs(
		sensor.DeviceID,
		query.Key,
		query.From,
		query.To,
		query.Interval,
	)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	sensorMinLogs, err := h.sns.GetMinSensorLogs(
		sensor.DeviceID,
		query.Key,
		query.From,
		query.To,
		query.Interval,
	)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, ListSensorMetricLogsResponse{
		Status: http.StatusOK,
		Data: &ListSensorMetricLogsResponseData{
			Avg: sensorAvgLogs,
			Max: sensorMaxLogs,
			Min: sensorMinLogs,
		},
	})
}
