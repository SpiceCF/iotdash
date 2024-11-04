package simulator

import (
	"fmt"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type EngineSwitchResponse struct {
	Status  int    `json:"status" example:"200"`
	Message string `json:"message" example:"Engine started"`
}

func (h *RouteHandler) engineSwitch(mode string) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		thermometerID, err := uuid.Parse(id)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		thermometer, err := h.ts.GetByID(thermometerID)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err.Error())
		}

		thermometer.IsActive = mode == "start"

		err = h.ts.Update(thermometer)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, err.Error())
		}

		if mode == "start" {
			err = h.tss.StartEngine(thermometerID)
			if err != nil {
				return c.JSON(http.StatusInternalServerError, err.Error())
			}
		} else {
			err = h.tss.StopEngine(thermometerID)
			if err != nil {
				return c.JSON(http.StatusInternalServerError, err.Error())
			}
		}

		return c.JSON(http.StatusOK, EngineSwitchResponse{
			Status:  http.StatusOK,
			Message: fmt.Sprintf("Thermometer %s engine %sed", id, mode),
		})
	}
}
